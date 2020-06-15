---
title: Agile Theme, Initiative, Epic, Story 이해하기
date: "2020-06-15"
tags: [DevOps, CI/CD]
---

며칠 전, 민간 항공우주 기업 SpaceX에서 첫 유인 우주선 Crew Dragon 발사 및 우주정거장 도킹에 성공했다는 소식이 들려왔습니다. 타국을 여행하듯 우주를 여행하게 되는 날이 그렇게 먼 일은 아닐지도 모르겠습니다.

만약, SpaceX와 같이 우주에 우주선을 발사하는 야심찬 프로젝트를 진행한다면, 처음 할 일은 무엇일까요? 우선 우리는 "우주를 개척한다"는 가장 큰 미션부터, "나사를 조인다"는 가작 작은 디테일까지 작업을 구조화 해야 합니다. 애자일 방식에서는 Initiative와 Epic, Story 등을 통해 우리의 궁극적 목표를 더욱 세분화하고, 가시화 할 수 있도록 도와, 작업을 구조화 할 수 있습니다.

## Story, Epics, Initiative, Theme가 무엇인가요?

- Stories는 "User Story" 라고도 하며, **최종 사용자의 관점에서 작성된 짧은 요구사항 또는 요청**입니다.
- Epics는 여러 "User Story"의 묶음으로, 중 분류라고 할 수 있습니다.
- Initiatives는 공통 목표를 갖는 Epics의 모음입니다.
- Themes는 조직 전체에 걸치는 큰 목표입니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/596b0b22-4a0c-4209-96eb-460074d917be/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/596b0b22-4a0c-4209-96eb-460074d917be/Untitled.png)

Theme, Initiative, Epics, Stories

## Epic과 Story

Story는 영화나 소설에서의 그것과 같다고 볼수 있습니다. 이야기는 하나의 간단한 시나리오를 구성합니다. 관련 있는 여러 이야기는 하나의 에픽으로 구성되며, 에픽은 Initiatives로 묶일 수 있습니다. 또한 이러한 조직을 관통하는 말하고자 하는 주제가 있기 마련입니다.

Marvel Cinematic Universe로 예를 들어 볼까요? 각 슈퍼 히어로는 저마다의 이야기를 가지고 있습니다. 그리고 그 히어로의 이야기들이 모여 Avengers, Guardians of the Galaxy, X-Men(Mutants)와 같은 에픽을 구성합니다. 그리고 이 모든 Epic들은 Marvel Cinematic Universe라는 Initiative로 묶일 수 있습니다. 또한, Theme는 MCU Initiative와 그 아래 Epic, Story를 관통하는 큰 주제들 또는 말하고자 하는 바라고 할 수 있습니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/551563f8-7c58-4a75-b780-5d8f8d3b7323/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/551563f8-7c58-4a75-b780-5d8f8d3b7323/Untitled.png)

Theme, Initiative, Epics, Stories - MCU

돌아와서, 애자일 소프트웨어 개발의 핵심 요소는 "사람"을 최우선으로 하는 것입니다.

Story는  실제 최종 사용자를 대화의 중심에 서게 합니다. 사용자의 관점에서, 사용자가 원하는 행위 또는 목표를 작성합니다. 개발자 및 기획자의 입장에서 추가될 기능을 나열하는 것이 아닙니다. 따라서 모든 Story는 비 기술적 언어로 작성 됩니다. 이를 통해 고객에게 어떻게 특정 가치를 제공할 것 인지를 분명히 할 수 있습니다.

Story는 팀이 1~2주의 스프린트 내에서 끝낼 수 있는 정도 크기의 범위를 가집니다. Story는 당연히 다른 Story와 연계되거나 종속적 관계가 있을 수 있습니다. 모든 일들이 그렇듯이 말이죠.

### Epic에 속하는 Stories 예시

SpaceX에서는 유인 우주선을 발사하는 장면을 Youtube 생방송으로 송출했습니다. 실시간으로 인류의 새로운 역사가 탄생하는 현장을 보는 일은 감탄을 자아냈습니다. 우리가 진행하고자 하는 우주선 발사 프로젝트 역시 스트리밍 서비스를 진행하고, 그 스트리밍 서비스를 개선하고자 한다면, 이때의 Story를 간단하게 구성해 봅시다.

- iPhone 사용자는 모바일 앱을 사용할 때 라이브 피드를 세로로 볼 수 있어야 한다.
- 데스크탑 사용자는 비디오 플레이어의 오른쪽 하단에 "전체 화면 보기" 버튼이 있어야 한다.
- 안드로이드 사용자는 애플 스토어에 연결되어 있어야 한다.

위의 세 Story는 우주선 발사 장면 스트리밍 서비스의 기능을 개선한다는 점에서 연관되어 있습니다. 따라서 **"우주선 발사 장면 스트리밍 서비스 개선"** 이라는 Epic으로 세 Story가 묶일 수 있습니다.

Epic과 Story로 구조화 하는 것은 팀 간의 의사 소통을 효과적인 돕습니다. 단적인 예로, 만약 진행상황을 Engineering 담당자에게 보여주어야 한다면, Epic 을 토대로 소통하고, 팀 내 동료들 간 기술적 소통 시에는 Story를 토대로 대화할 수 있습니다.

## Initiative과 Epic

Initiative는 Story의 모음인  Epic의 모음입니다. 에픽보다 훨씬 광범위하고, 큰 목표에 대한 분류입니다. 따라서, Initiative는 궁극적 목표에 대한 더욱 큰 틀에서의 구조화를 가능하게 합니다. 기간을 토대로 나눈다면, Epic은 1~3개월 이내 처리할 수 있는 정도의 크기, Initiative는 6~12개월 안에 처리할 수 있는 정도의 크기라고 볼 수 있습니다. 대개 Initiative는 추상적인 단어로 작성됩니다.

### Initiative에 속하는 Epics 예시

SpaceX는 발사체를 재 사용하는 등의 획기적인 방법으로 우주선 발사의 비용을 절감하였습니다. 우리 우주선 발사 프로젝트 또한 비용 절감을 목표로 한다고 가정해 볼까요?

"연간 5%의 발사 비용 절감"이라는 Initiative 아래 다음과 같은 Epic들이 있을 수 있겠네요. 또, 해당 Epic은 Story로 구성되어 있을 것입니다.

- Epic: 발사 단계의 연료 소비량 1% 감소
    - Story: 기술자는 발사 연료의 소비량을 1% 감소하기 위해 발사 시 OOO를 해야 한다.
    - Story: ...
- Epic: 선내 온도 조절기를 71도에서 69도로 변경
    - Story: 온도 조절 기사는 69도로 낮추기 위해 OOO 해야 한다.
    - Story: ...

다시 위의 유인 우주선 발사 장면을 Youtube 생방송으로 송출하는 예시로 들어 봅시다. Initiative는 "유인 우주선 발사 장면 공유" 가 될 수 있습니다. 이 Initiative아래 Epic으로는 "우주선 발사 장면 스트리밍 서비스 개선", "SpaceX 유튜브 계정 구독자 유치", "선내 카메라 및 방송 송출 방법 구축" 등이 있을 수 있습니다. 또, 그 아래에는 사용자의 입장에서 작성된 Story가 작성될  수 있습니다.

## Theme

Theme는 Initiative와 Epic을 정하는 데에 있어서 영감을 주는 존재입니다. 매년 또는 매 분기, 조직이 나아가고자 하는 방향을 추적 할 수 있도록 합니다. 조직이 처한 상황과 어떤 가치를 중점적으로 바라보는 지 등에 따라서 Theme는 바뀌기도, 지속되기도 합니다.

Theme는 Initiative, Epic과 일대일 관계를 가지는 것만은 아닙니다. Theme는 여러 Initiative, Epic, Stories를 관통해 적용되는 일종의 관념입니다.

앞서와 같이 우주선 발사의 예를 들어 봅시다. 유인 우주선이 가장 중점적으로 생각해야 할 문제는 바로 해당 우주선에 탑승한 승무원의 안전입니다. 궁극적으로 인류의 우주여행을 목표로 하고 있는 SpaceX가 불의의 사고로 승무원을 잃게 되는 상황을 맞이한다면, SpaceX가 생산해내는 우주선과 그와 관련된 서비스를 신뢰할 수 있을까요? 천문학적 비용이 들더라도, 승무원의 안전이 제일 중요합니다. 이러한 관점에서,  "Safety First"를 하나의 Theme로 정의할 수 있습니다.

## 이후..

### Product Backlog

이제, Theme 부터 Initiative, Epic을 거쳐 User Story로 고객에게 가치를 제공할 방법까지 구조화하였습니다. 이제는 실제 개발과 공사에 착공해야 합니다. 수 많은 User Story 중, 이제 실제 처리 할 수 있는 User Story를 결정합니다. 비 기술적 언어로 작성된 User Story들을 이제 기술적으로 설명할 차례입니다. 우리는 UserStory에 대해 기술적인 설명과 완료해야 하는 각 하위 작업과 그 순서를 명시한 목록으로 세분화한 것을 "Task"라고 명명합니다.

많은 UserStory와 그에 따르는 Task들이 만들어 질 수 있습니다. 

이 모든 UserStory-Task 목록은 각 Initiative에 대한 Backlog라고 할 수 있습니다.

### Sprint Backlog

개발자는 UserStory와 Task에 기반하여 작업을 진행할 수 있습니다. 그 전에, 우리는 Sprint 단위로 작업을 실시합니다. 우선 순위와 상하 관계, 종속성 관계 등을 토대로 먼저 진행되어야 하는 일부터 분리합니다. 각 스프린트 별로 분리된 UserStory-Task는 Sprint Backlog라고 합니다.

이제, 각 UserStory-Task에 시간 소요 포인트(스토리 포인트)를 부여합니다. 스토리 포인트를 부여할 때에는 엔지니어 모두의 의견을 반영합니다. 타 엔지니어의 스토리 포인트 견적이 다른 엔지니어에게 영향을 주지 않도록 동시에 공개합니다. Planning Poker가  대표적으로 사용됩니다.

스토리 포인트 부여 이후, 각 UserStory-Task에 담당자를 설정합니다. 아직 미흡하게 구체화된 부분은 UserStory의 작성자와 함께 대화하고, 조율합니다. 모호한 부분을 추측하지 않습니다.

### 이후, ... 그리고 Backlog의 추가

이후는 Scrum 룰을 따라 개발에 돌입합니다. 1~3 주 단위의 Sprint를 지속적으로 수행하며 각 스프린트마다 고객에게 인도 가능한 완성물을 만들어냅니다. Epic, Initiative와 UserStory는 지속적으로 추가될 수 있습니다. 새로운 Initiative, Epic이 추가되는 경우, 그에 따르는 UserStory를 정의하여 함께 추가됩니다. 이미 존재하는 Initiative, Epic에 UserStory가 추가될 수도 있습니다.

이후의 스프린트에서는 추가된 UserStory-Task들을 포함해 모든 Product Backlog에서 우선 순위, 종속성 관계 등을 고려하여 새로운 Sprint Backlog로 생성하고 스프린트를 반복하여 지속적으로 변화에 대응할 수 있습니다.

## Reference

[https://www.atlassian.com/agile/project-management/epics-stories-themes](https://www.atlassian.com/agile/project-management/epics-stories-themes)
[https://www.atlassian.com/agile/project-management/epics](https://www.atlassian.com/agile/project-management/epics)
[https://www.atlassian.com/agile/project-management/user-stories](https://www.atlassian.com/agile/project-management/user-stories)