---
title: Github Actions를 이용해 CI/CD 파이프라인 구성하기
description: Github Actions를 통해 코드 변경사항 반영에 따라 진행되는 workflow를 자동화하는 과정에 대해 기록합니다.
date: "2020-04-30"
tags: [DevOps, CI/CD]
---

## 일단, CI/CD가 뭔데?

CI/CD는 Continuous Integration(지속적 통합) / Continuous Delivery(지속적 전달) 의 줄임말이다. 
애플리케이션 개발단계를 자동화하여 애플리케이션을 보다 짧은 주기로 고객에게 제공하는 방법이다.

새로 개발한 기능, 버그 수정점 등을 실제 배포 중인 서비스에 통합하기 위해서는 여러 과정이 필요하다. 소스코드를 테스트하고, 빌드하고, 컨테이너 화하여 통합적인 저장소에 전달 후 서비스 무 중단 배포 등의 과정이 그것이다. 이 모든 과정을 통상적으로 CI/CD라고 부른다.

더 자세히 말하면, CI는 테스트, 빌드, Dockerizing, 저장소에 전달 까지 프로덕션 환경으로 서비스를 배포할 수 있도록 준비하는 프로세스를 말하고, CD는 저장소로 전달된 프로덕션 서비스를 실제 사용자들에게 배포하는 프로세스를 의미한다.

CircleCI, TravisCI, Jenkins, Atlassian - Bamboo, 등 여러 CI/CD를 위한 툴이 많다.

## Github Actions가 뭔데?

github에서 공식적으로 제공하는 CI / CD 툴(개발 워크 플로우 자동화 툴)이라고 보면 된다.

기존에 이미 Github과 서드파티 서비스들을 연동하여 자동화 해왔다. (TravisCI, CircleCI, Jenkins, CodeCov 등) 연동을 통해서 진행했던 많은 CI 작업들을 이제 Github(뒤에 MS를 업은)이 공식적인 기능으로 지원하게 되어, 개발 환경이 분산되지 않고 일원화된 개발 환경(GIthub)을 통해 많은 모든 과정을 통합적으로 관리할 수 있게 되었다.

### 무료야?

public Repository에 한해서 무료.
private Repository에 대해서는 runner(워크플로우 구동 환경) 에 따라 분당 / 시간당 금액을 청구.
자세한 사항은 [https://github.com/features/actions](https://github.com/features/actions) 에서 확인.

### Github Actions로 할 수 있는 일

npm에  패키지를 배포, Docker Hub에 이미지를 배포, AWS 에 서비스를 배포, GCP 에 서비스를 배포 하는 작업 등을 Github에서 바로 할 수 있다. 기존의 익숙한 Git/GIthub 기능인 Pull Request, Push 등을 통해서 말이다.

또한, 브랜치 별로 어떤 Action을 실행할 지 설정할 수 있어 각 개발 팀에 최적화 된 workflow를 만들어 낼 수 있다.

## Github Actions 어떻게 하는데?

### Github Actions의 개념

- Workflow
자동화된 전체 프로세스를 나타낸 순서도. Github에게 YAML파일로 정의한 자동화 동작을 전달하면, Github Actions는 해당 파일을 기반으로 그대로 실행시킨다.
- Job
그룹의 역할로, 단일 가상 환경을 제공한다.
- Step
Job안에서 순차적으로 실행되는 프로세스 단위로, 파일 시스템을 통해 서로 정보를 공유, 교환할 수 있다. step에서 명령을 내리거나, action을 실행할 수 있다.
- Action
타인들 또는 작성자에 의해서 미리 정의된 호출 매커니즘을 불러와 사용할 수 있다. 사용자가 직접 커스터마이징하거나, 어느 나/그룹/개발팀/제품/회사 등에서 정의한 action을 불러와 사용할 수 있다. Github Marketplace에서 공유되고, marketplace에 공유된 action은 yaml 파일에서 곧바로 사용할 수 있다.
- Event
workflow 실행 기준으로, cron과 같이 시간에 따라 작업을 실행하게 할 수도, git push / pull-request 등의 GIthub Repository 이벤트를 기준으로 실행하게 할 수도 있다.

### Workflow 생성하기

yml 파일로 각 Action workflow를 설정할 수 있다. 해당 설정 파일은 레파지토리에 등록한 프로젝트 폴더의 최상위에 .github/workflow/*.yml 로 위치시킨다. 다음은 NodeJS 사용 시, 예제로 제공하는 workflow yml 파일이다.

```yaml
name: Node CI
on: [push]
jobs: ## job 들을 명시
  build: ## job id
    runs-on: ubuntu-latest ## 해당 job의 구동 환경을 정의
    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x]
    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: Npm Install, build and test
      run: |
        npm ci
        npm run build --if-present
        npm test
      env:
        CI: true
```

위에서부터 아래로 훑으며 설명하겠다.

- 최 상위의 `name`
해당 Workflow의 이름을 명시한다.
- `on`
해당 Workflow의 Event를 명시한다. cron 문법으로 시간을 설정할 수도, push | pull-request 등 깃헙 이벤트를 구독할 수도, 실행할 브랜치를 제한할 수도 있다.

```yaml
## master, dev 브랜치에 push 된 경우에 실행
on:
  push:
    branches: [master, dev]

## 10분마다 실행 workflow
on:
  schedule:
    - cron: '*/10 * * * *'
```

- `jobs`
jobs에 등록된 job들은 기본적으로 병렬적으로 실행된다. job_id를 키값으로 하여 생성할 수 있다.

```yaml
jobs:
  some-job-id:
    ...
  some-job-id-2:
    ...
```

- `jobs.<job_id>.runs-on`
**Required,** 해당 job을 실행할 컴퓨팅 자원(runner)을 명시한다.
ubuntu-latest, ubuntu-18.04, ubuntu-16.04, macos-latest, windows-latest 등이 들어갈 수 있다.
- `jobs.<job_id>.env`
해당 job의 컴퓨팅 자원에 설정 할 환경변수를  key=value의 형태로 명시한다.
- `jobs.<job_id>.strategy`
strategy는 jobs가 여러 환경에서의 테스트/배포 등을 위해 build matrix를 설정할 수 있게 한다. 다른 환경(다른 Nodejs 버전) 들을 명시해 여러 환경에서의 같은 jobs를 동시에 실행할 수 있다.
- `jobs.<job_id>.steps`
job이 가질 수 있는 순차적인 동작 나열이다. 명령어를 실행하거나, setup하거나, 깃헙 코드를 checkout하거나, github marketplace에 있는 action을 가져와 실행하거나, 도커 이미지로 생성하거나, 도커 이미지를 배포하거나, aws/gcp 등에 서비스를 배포하는 작업 등을 설정할 수 있다.
각각의 step은 job의 컴퓨팅 자원에서 독립적인 프로세스로 동작하고, job의 runner(컴퓨팅 자원)의 파일 시스템에 접근할 수 있다.
- `jobs.<job_id>.steps.name`
step의 이름을 명시한다. github actions 페이지에서 workflow구동 로그를 확인할 때 보여진다.
- `jobs.<job_id>.steps.uses`
해당 스텝에서 사용할 action을 선택한다. github marketplace에 선구자들이 올려 둔 많은 action들이 있다. 
공신력있는 기관에서 생성한 github에 의해 공식적으로 확인된 action들도 있다.
github 에서는 action을 사용 시, version을 명시하여 사용하기를 강력히 추천한다.
`{owner}/{repo}@{ref|version}` 의 형태를 지닌다.
각 action 는 필수적으로 document가 필요하다. 사용하고자 하는 action이 있다면 해당 레파지토리를 확인해보면 사용 방법과 같은 내용을 적어두었을 것이다. 해당 방법들을 확인한 후 사용하기를 권장한다.

```yaml
jobs:
  build:
    strategy:
      matrix:
        node-version: [10.x, 12.x]

    runs-on: ubuntu-latest
    steps:
      - name: Checkout source code ## 소스코드를 checkout 하는 step
        uses: actions/checkout@v2

      - name: Cache yarn dependencies ## yarn dependencies를 cache 하는 step
        uses: actions/cache@v1
        id: yarn-cache
        with:
          path: node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-
```

- `jobs.<job_id>.steps.run`
job에 할당된 컴퓨팅자원의 shell을 이용하여 command line program을 구동한다.
nodejs 프로젝트의 경우, 이 과정에 npm package의 scripts를 구동하는 경우가 가장 대표적일 것이다.

```yaml
jobs:
  some-job:
    steps:
      - name: My First Step
        run: | ## 명령어를 여러 줄 사용하기 위해서는 다음과 같이 한다.
          npm install
          npm test
          npm build
```

## 더 복잡한 과정은 어떻게 해?

더 자세한 내용은 Github Actions의 Workflow 문법 공식 문서에서 확인할 수 있다.

[Workflow syntax for GitHub Actions](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions)

## 커스텀 action를 만드는 방법은?

> 바퀴를 다시 발명하지 마라.

라는 말이 있듯, 대부분의 경우 github actions marketplace 에 있다. 그리고 깃헙을 통해 공식 인증된 action을 사용하는 것이 정신 건강에도, 프로젝트의 건강에도 좋을 것이다.

하지만, 언제나 예외는 존재하기 마련이다. 내 몸에 딱 맞는 맞춤 양복같이 내 프로젝트에 딱 맞는 아름다운 action을 만들어 사용할 수도 있다. 딱히 어려워 보이지도 않아서 조금만 시간을 들인다면 커스텀 action을 제작하여 사용할 수 있을 것이다. 

더 자세한 내용은 Github Actions의 building actions 공식 문서에서 확인할 수 있다.

[Creating a JavaScript action](https://help.github.com/en/actions/building-actions/creating-a-javascript-action)