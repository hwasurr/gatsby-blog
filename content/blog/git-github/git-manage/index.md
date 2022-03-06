---
title: Git으로 하는 프로젝트 관리
description: 간단한 예제를 통해 만나보는 git을 통한 형상관리와 github 리모트 저장소의 pull request 까지의 과정을 작성하였습니다.
date: "2020-07-12"
tags: [DevOps, git, 형상관리]
---

## Git

- 파일의 변경 사항을 추적하고, 프로젝트의 작업을 조율하기 위한 분산 버전 관리 시스템

## Github

- 대표적 무료 git 저장소. 현재 Microsoft 소유.
- 오픈소스프로젝트의 성지

## Github의 서비스

- **Git Repo 호스팅**
- **워크플로 자동화 (Github Actions)**
- 정적 웹사이트 호스팅 (Github Pages)
- 패키지 저장소 (Github Packages)
  javascript의 npm, java의 mvn 또는 gradle, ruby: gem, .NET: NuGet 등을 지원합니다.
- 프로젝트 관리
- 이슈 트래킹
- **풀 리퀘스트**

## 알아야 할 기능

### **깃: 초기화**

git은 모든 파일을 트래킹합니다. git을통해 형상관리하기를 원하는 폴더로 이동해 초기화 합니다.
해당 폴더에 `.git` 이름을 가진 숨김 폴더가 생성됩니다. 해당 폴더안에는 git이 지속적으로 관리하는 트래킹 정보가 저장됩니다. 이 폴더를 지우면 변경 사항에 대한 추적정보를 알 수 없게 됩니다.
개발 도중 .git 폴더를 수동으로 만질 일은 특별한 경우를 제외하고는 없습니다.

```bash
git init
```

### 깃: 스테이징 staging

git은 파일 변경 정보를 저장할 때 곧바로 저장하지 않고, staging과 commit 단계를 거칩니다. 스테이징은 **저장하고 싶은 부분만 선택하는 것**을 의미합니다.

```bash
git add <filename>
```

모든 변경사항을 스테이징 하고 싶다면, 다음과 같이 할 수 있습니다.

```bash
git add -A
## 또는
git add .
```

### **깃: 커밋 commit**

git에서 변경 내용을 저장하는 단위를 **"커밋"**이라고 부릅니다. commit 명령은 `git add` 명령을 통해 현재 staged 상태인 파일들의 현재 상태를 캡처하듯 저장합니다. `-m ""` 옵션을 통해 커밋 메시지를 입력할 수 있습니다. 특별한 경우를 제외하고는 언제나 커밋 메시지를 지정해서 커밋합니다.

```bash
git commit -m "message"
```

`-a` 옵션을 통해 스테이징과 커밋작업을 동시에 진행할 수 있습니다. `-m` 옵션과 함께 사용할 수 있습니다.

```bash
git commit -am "commit with staging"
```

`-amend` 이전 커밋에 현재 변경 사항을 새로 추가(덮어쓰고 싶은 경우)하고 싶은 경우에 사용할 수 있습니다.

```bash
git commit -amend "asdfasdf"
```

### **깃: remote저장소로부터 프로젝트 생성 clone**

깃은 github, gitlab등 원격 저장소를 설정하여 호스팅할 수 있습니다. 원격 저장소에 저장되어 있는 프로젝트를 현재 사용자의 로컬로 다운로드할 때, `clone` 이라는 명령어를 사용할 수 있습니다.

```bash
## git clone https://github.com/<repo-owner>/<repo-name> <프로젝트 폴더가 생성될 경로>
## 현재 폴더 아래에 프로젝트 폴더를 저장하고자 한다면
git clone https://github.com/hwasurr/git-test .
## example-clone 이라는 하위 폴더에 프로젝트를 저장하고자 한다면
git clone https://github.com/hwasurr/git-test ./example-clone
```

### **깃: remote 저장소(원격 저장소) 지정**

로컬에서 진행한 변경사항을 원격 저장소에 반영하지 않으면 협업중인 개발자와 변경사항을 공유할 수 없습니다. 로컬의 변경사항을 개인의 컴퓨터에서만 확인할 수 있습니다.

로컬에서 git을 통해 작업한 내용을 원격 저장소에 업로드하고자 할 때, 새로운 repository를 생성하고, 현재 폴더를 해당 repository에 연결합니다. `git remote add <remote-name> <repo-url>`으로 로컬의 git 폴더를 원격 저장소에 연결할 수 있습니다. remote-name 으로 해당 원격 저장소의 별칭을 설정할 수 있습니다. 대부분 기본 원격 저장소를 `origin`이라고 이름 짓습니다.

```bash
git remote add origin https://github.com/<username>/<repo-name>.git
```

- 깃: remote저장소 url 조회

  ```bash
  git remote get-url <remote name>
  ```

- 깃: remote저장소 url 새로 지정

  ```bash
  git remote set-url <remote name> <new remote url>
  ```

### **깃: branch**

branch는 나무의 가지라는 뜻을 갖고 있습니다. 브랜치는 git의 파일 변경사항 내용에 대한 관리를 여러 갈래로 나누어 할 수 있도록 해 줍니다. 각 브랜치에서는 다른 브랜치와 독립적으로 작업을 진행할 수 있습니다.

- 깃: 현재 활성된 브랜치 변경 checkout

  ```bash
  git checkout <target branch name>
  ```

- 깃: 새로운 브랜치 생성

  ```bash
  git checkout -b <new branch name>
  ```

  어떤 브랜치를 어떤 환경에 사용하고, 어떤 브랜치에서 어떤 개발을 진행할 것인가 등에 대해서는 많은 의견이 있습니다만, 통용되는 견해는 "각자의 상황에 맞게" 입니다.
  와일트루에서는 대개 브랜치를, `master`, `dev`, `release` 등으로 구성하고 테스트 환경이 필요할 시 `test` 브랜치를 만들어 사용합니다.  
   각자의 작업은 자신의 영어이름브랜치에서 진행하고, 완료된 작업은 `dev`브랜치로 병합합니다. `dev`에서는 병합과정에서 생길 수 있는 이슈를 해결한 뒤, 로컬테스트를 진행하고, 프로덕션과 동일한 환경에서의 테스트 진행이 필요하다면 `test`브랜치로, 그렇지 않다면 `master` 브랜치로 코드를 병합합니다.  
   `master`와 `test` 브랜치는 와일트루에서 사용하는 클라우드 서비스인 AWS와 github actions로 연결되어 푸시이벤트 발생시 실제 배포 서버가 변경되므로 신중히 진행 하여야 합니다.

### **깃: 원격 저장소에 변경 반영 push**

로컬에서의 커밋 정보를 원격 저장소로 반영하고자 할 때에는 `push` 명령어를 사용합니다. 현재 폴더의 origin 원격 저장소의 dev 라는 이름의 브랜치에 정보를 저장하고자 한다면 다음과 같이 할 수 있습니다.

```bash
## git push <remote-name> <branch>
git push origin dev
```

### **깃: 원격 저장소에서 변경사항을 다운로드 pull**

대부분의 개발은 혼자 진행하지 않습니다. 타인이 업데이트한 코드를 내려받고자 할 때, `pull`이라는 명령어를 사용할 수 있습니다.

origin 원격 저장소의 dev 브랜치에 새로운 기능을 추가한 코드가 올라와 있을때, 해당 패치 사항을 자신의 로컬 폴더에 반영하고자 할 때 다음과 같이 할 수 있습니다.

```bash
git pull origin master
```

push오하 pull 과정에서 많은 경우, 내가 수정한 코드와 팀원이 수정한 코드가 충돌을 일으킬 수 있습니다. 이때, 원격저장소의 코드와 현재 로컬의 코드를 비교하여 충돌 부분에 대해 처리해 주어야 합니다. 물론, 이전에 코드를 작성했던 팀원과 함께 상의하여 결정하여야 합니다. 이 과정을 merge라고 합니다.

### **깃: 머지 merge**

merge명령은 현재 브랜치의 코드에 타겟 브랜치의 코드를 병합합니다. 이 때, 충돌 되는 코드 변경사항을 확인하고 확인 할 수 있도록 도와줍니다. `hwasurr` 브랜치에 `dev` 브랜치의 최신 변경사m항을 적용하고자 한다면 다음과 같이 할 수 있습니다.

```bash
git checkout hwasurr
git merge dev
```

다시 한 번 생각해야할 것은 merge 역시 로컬에서의 변화입니다. merge 한 결과는 로컬에서 적용됩니다. 이후 다시 원하는 branch로 push 한다면 원격저장소에 적용됩니다.

### **깃헙: 풀리퀘스트 pull request**

git의 가장 유명한 원격저장소 github에서는 Pull_Request 라는 기능을 제공합니다. 풀리퀘스트는 웹의 GUI로 merge 과정을 바라볼 수 있도록 돕고, 자연스러운 코드리뷰 환경을 제공합니다.

쉽게 말하면 **"제가 수정한 000브랜치의 코드 변경사항이 이런데요, 타겟 브랜치 XXX에 코드를 병합해도 될까요?"** 하는 요청이라고 볼 수 있습니다. 풀리퀘스트를 오픈하면 github의 pull request 탭에 해당 풀리퀘스트가 생성되고, 모든 개발자가 변경 사항을 커밋을 기준으로 확인할 수 있습니다.

삭제된 코드는 붉은 색으로, 추가된 코드는 초록 색 배경색을 가지고, line by line으로 코멘트를 달아 코드리뷰를 진행할 수 있습니다. 코드리뷰에서 언급된 새롭게 변경이 필요한 코드를 모두 수정한 뒤, 동일 브랜치(not 타겟브랜치)에 새롭게 커밋, 푸시하면 변경사항이 일제히 적용됩니다.

모든 코드리뷰가 끝난 이후 버튼 클릭으로 merge를 실행할 수 있습니다.

## Git on VSCode

간단한 예제로 git과 익숙해지고, vscode에서 git으로 소스컨트롤 하는 방법을 알아봅니다.

### 프로젝트 생성

먼저, test라고 이름을 붙인 빈 폴더에 test.js 파일을 하나 만듭니다.

```jsx
mkdir test
cd test
code .
```

이후 code . 을 통해 vscode를 열었습니다. 간단한 파일은 다음과 같습니다.

![git-manage](./git-manage.png)

이후 터미널에서 `git init` 명령을 통해 현재 git 폴더로 설정해 줍니다. source control탭에 변화가 생긴것을 볼 수 있습니다.

![git-manage2.png](./git-manage2.png)

소스컨트롤 탭으로 들어가면 다음과 같이 변경사항이 있는 파일들이 목록화되어 있습니다.

### 스테이징과 커밋

![git-manage2.png](./git-manage2.png)

이 파일들은 아직 스테이징 되지 않은 파일입니다. `git add test.js` 명령 또는 `+` 버튼을 클릭함을 통해 스테이징 시킬수 있습니다.

이 상태에서 스테이징 된 파일과 되지 않은 파일이 커밋시 어떻게 다르게 동작하는 지 확인하기 위해 두번째 파일을 생성해 보겠습니다. 좌측 탭의 가장 상단 Explorer로 돌아가 `test2.js` 파일을 생성합니다.

![git-manage3.png](git-manage3.png)

이후 다시 소스컨트롤로 돌아가면 다음과 같이 스테이지된 파일과 되지않은 파일이 나누어 리스팅 되는 것을 볼 수 있습니다.

![git-manage4.png](git-manage4.png)

여기서 스테이지된 test.js 파일을 `git commit -m "test commit"` 또는 Message 입력칸에 커밋 메시지 입력 후, 체크✔️버튼으로 커밋합니다.

커밋 시, user.name과 user.email을 입력하라는 메시지가 나오면 다음과 같이 진행한 이후 다시 커밋하시기 바랍니다.

```bash
git config --global user.name "<your github name>"
git config --global user.email <your@github.email>
```

스테이지된 파일만 커밋이 된 것을 확인할 수 있습니다. 이제 남은 `test2.js` 파일도 커밋합니다.

![git-manage5.png](git-manage5.png)

### 로그 확인

터미널에서 `git log` 명령을 통해 커밋 히스토리를 확인하면 다음과 같을 것입니다.

![git-manage6.png](git-manage6.png)

### 원격 저장소 생성 및 연결

이제, 원격 저장소 github에 진행하고 있는 프로젝트를 업로드하는 절차를 시작하겠습니다.

먼저 깃헙에서 저장소로 사용할 repository를 생성합니다. 저는 `git-test` 라는 이름의 레파지토리를 private 권한으로 다음과 같이 생성하겠습니다.

![git-manage7.png](git-manage7.png)

repository를 생성한 이후, vscode로 돌아와 작업하던 폴더에 방금 생성한 repository를 연결하도록 합니다. repository의 uri는 `https://github.com/<your name>/<repo name>.git` 과 같습니다.

```bash
git remote add origin https://github.com/hwasurr/git-test.git
```

이후 제대로 적용되었는 지 확인해 봅니다.

```bash
git remote get-url origin
```

올바른 링크가 출력되는 것을 확인하고, 원격 저장소로 지금껏 작업했던 내용을 아래의 `push` 명령 또는 `...` 버튼 > `push`를 클릭하여 업로드 합니다.

![git-manage8.png](git-manage8.png)

```bash
git push -u origin master
```

`-u` 옵션은 이제 현재 로컬의 `master`라는 브랜치를 자동으로 origin 원격저장소의 master 브랜치로 연결해 master브랜치에서 `git push`또는 `git pull`만 입력하여도 자동으로 origin의 master 브랜치에 push또는 pull작업을 실시하게 도와줍니다.

github에서 vscode에서 github에 접근할 권한을 요청한다면 승인해주세요!

다시 브라우저를 열고 github의 repository 페이지로 돌아가면, 다음과 같이 github 원격 저장소에 로컬의 변경사항들이 올바르게 반영되어 있는 것을 볼 수 있습니다.

![git-manage9.png](git-manage9.png)

### 브랜치 별 관리

이제, 나만의 branch를 설정하고 해당 브랜치에서 어떤 업데이트를 거쳐 파일을 변경한 뒤, master 브랜치로 병합하는 과정을 github의 pull request 기능을 통해 진행해 보겠습니다.

다시 vscode로 돌아와, 새로운 브랜치 `dev`를 만듭니다.

```bash
git checkout -b dev
```

`-b` 옵션은 현재 명령어를 입력하는 지금의 브랜치를 기준으로 새로운 브랜치 (여기서는 dev)를 만든다는 의미입니다.

위의 명령어를 실행하면, 브랜치가 만들어짐과 동시에 좌측 아래 브랜치가 `dev`브랜치로 옮겨진 것을 확인할 수 있습니다.

![git-manage10.png](git-manage10.png)

여기서 한가지 알아야 할 것은 이 브랜치는 현재 작업중인 당신의 컴퓨터 로컬에서만 생성된 것 이라는 사실입니다. 원격 저장소 github으로 가서 아무리 새로고침해봐도 `dev`브랜치는 찾을 수 없습니다. 원격 저장소에 새로운 branch `dev`의 존재를 반영하기 위해 `push`명령을 실행합니다.

```bash
git push -u origin dev
```

이후, `test.js` 파일을 다음과 같이 조금 변경합니다. 이후 "sayhello word 변경"이라는 커밋메시지를 작성하고 체크 버튼을 이용해 커밋합니다.

![git-manage11.png](git-manage11.png)

vscode 좌측 하단 상태바를 통해 origin 원격 저장소에서 pull 할 수 있는 커밋의 수와 origin 원격 저장소로 push할 수 있는 커밋의 수를 확인할 수 있습니다.

![git-manage12.png](git-manage12.png)

원격저장소의 dev브랜치로 지금의 변경사항을 반영하기 위해 명령어를 작성하거나, ... > push 버튼을 눌러 푸시합니다.

```bash
git push origin dev
```

이후 github repository로 돌아가 Branch를 dev로 변경하여 변경사항이 제대로 반영되었는지 확인해 봅니다.

![git-manage13.png](git-manage13.png)

올바르게 변경되었음을 확인할 수 있습니다.

![git-manage14.png](git-manage14.png)

### 풀리퀘스트

이제 dev에서 master로 pull request를 생성해 현재의 최신버전인 dev를 master로 병합하는 과정을 진행해 보겠습니다.

먼저 github repository에서 Pull request 탭을 클릭한 후, New pull request 버튼을 클릭해 풀리퀘스트생성을 시작합니다. `base` 브랜치는 병합이 되는 브랜치, `compare`브랜치는 병합을 원하는 브랜치 입니다. 반대로 작성하지 않도록 주의합니다.

올바르게 dev에서 master로 향하도록 설정하면, 자동으로 변경사항을 다음과 같이 알려줍니다. `this is test` 에서 `this is test - updated`로 word 변수가 변경된 것을 확인할 수 있습니다. `Create pull request` 버튼을 눌러 생성하고자 하는 풀리퀘스트의 제목과 내용을 작성한 이후, 풀리퀘스트를 생성합니다. 제목과 내용은 무엇에 대한 변경사항인지 알 수 있도록 명확하게 작성합니다.

![git-manage15.png](git-manage15.png)

다음과 같이 풀리퀘스트가 생성되었습니다.

![git-manage16.png](git-manage16.png)

커밋 메시지를 클릭하면 해당 커밋에서 어떤 변경사항이 있었는 지 확인할 수 있습니다. `sayhello word 변경` 커밋을 클릭합니다.

파일의 변경사항을 보여주는 화면이 나타났습니다. 여기서는 매 줄마다 파란색 `+`버튼을 클릭해 코멘트를 입력할 수 있습니다.
작성한 변경사항을 확인한 이후, 버그를 유발하는 코드 또는 개발표준에 맞지 않는 코드 등 불완전한 부분을 지적하고 알려주어 변경하도록 돕습니다.

예를 들어, sayHello 함수의 word 변수명이 모호하다고 생각되어 greetingWord 라는 이름으로 변경하기를 제안해보겠습니다. 내용을 작성하고 `Start a review`를 클릭해 리뷰를 시작합니다. (Add a single comment는 리뷰가 아닌 단순 코멘트를 작성하는 버튼입니다. 새로운 내용을 배웠다거나 칭찬을 하고싶을 때 주로 쓰면 될 것 같아요..)

![git-manage17.png](git-manage17.png)

이렇게 작성한 리뷰는 우측 상단의 Finish your review를 클릭하면 github repository에 반영됩니다. (여러개의 리뷰를 동시에 진행할 수 있습니다.)

![git-manage18.png](git-manage18.png)

작성한 여러 review에 대한 총체적 comment를 달 수 있고, 리뷰의 타입을 선택할 수 있습니다. `Comment`는 간단한 피드백 에 대한 내용, `Approve`는 리뷰 승인, `Request changes`는 코드에 문제가 있다고 판단되며 코드를 반드시 수정 요구한다는 의미를 담고 있습니다. 현재는 자신이 생성한 풀리퀘스트에 자신이 리뷰를 진행하고 있어 `Approve`와 `Request changes`가 비활성화된 상태입니다. 연습을 위한 것이니, `Comment`로 리뷰를 게시합니다.

각 repository마다 pull request 룰을 설정할 수 있습니다. 예를 들어 2명이상에게 approve를 받지 못하면 해당 pull request를 merge 할 수 없는 등의 기준을 설정할 수 있습니다.

게시한 리뷰는 다음과 같이 나타납니다.

![git-manage19.png](git-manage19.png)

해당 리뷰에 대해서 서로 의견을 나눌 수 있습니다. 풀리퀘스트 게시자는 변경해야 마땅하다는 판단이 들면, 새로 변경사항을 동일 브랜치에 커밋, 푸시하면 풀리퀘스트에도 자동으로 변경사항이 적용됩니다.

다시 vscode로 돌아가 코드를 변경하고 커밋, 푸시합니다.

![git-manage20.png](git-manage20.png)

```bash
git commit -m "sayHello word => gretting word"
git push
```

푸시 이후 풀리퀘스트 창으로 돌아가면, 리뷰 아래에 새로운 커밋이 생긴것을 볼 수 있습니다. 이런 식으로 지속적으로 피드백하고, 변경하며 코드리뷰를 진행할 수 있습니다.

![git-manage21.png](git-manage21.png)

이후 모든 코드리뷰가 완료되면 `Merge pull request` 버튼을 클릭해 이 풀리퀘스트의 변경사항을 `master`로 반영합니다. 이 때, `merge`의 세 가지의 기술적 방식이 있는데, 이는 차차 알아가면 될 것입니다. 이 [링크](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EA%B3%A0%EA%B8%89-Merge)를 참고하면 될 것 같습니다. 여기서는 기본으로 설정되어 있는 `Create a merge commit` 방식(master 브랜치에 merge에 대한 새로운 커밋을 생성)으로 진행하겠습니다.

해당 pull request를 merge한 이후 github repository master 브랜치의 소스코드를 확인하면 변경사항이 올바르게 적용된 것을 확인할 수 있습니다.

## 마치며

간단한 예제를 통해 git과 github을 사용하는 방법을 알아보았습니다. 언급한 기능 이외에도 git과 github을 이용해 더욱 많은 작업을 처리할 수 있습니다. 최근에는 github actions라는 지속적 통합을 위한 컴퓨팅 서비스가 출시되어 기존에 서드파티로 처리하던 CI/CD 작업을 github이라는 플랫폼 안에서 처리할 수 있게 되었습니다. 또한, github은 웹페이지 내에서 작동하는 IDE를 제작하고 있으며, npm을 인수하는 등, 앞으로의 행보가 더욱 기대됩니다.

git의 사용은 개발자의 기본이라 생각합니다. 자신의 몸을 다루는 것과 같이 익숙해져야 한다고 생각합니다. 저도 아직 미숙하지만, 지속적으로 성장하기 위해 노력하고 있습니다. 많이 부족한 이 글이 여러분의 성장에 조금이나마 도움이 된다면 더할 나위 없이 좋겠습니다.
