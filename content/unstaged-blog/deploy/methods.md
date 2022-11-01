---
title: 무중단 배포
description: 간단한 예제를 통해 만나보는 git을 통한 형상관리와 github 리모트 저장소의 pull request 까지의 과정을 작성하였습니다.
date: "2020-07-12"
tags: [DevOps, git, 형상관리]
---

배포 과정

예전에 비해 배포 주기가 줄어듦

유저에게 빠르게 다가갈 수 있음.

작은 단위별 배포 가능

잦아진 만큼 배포 전략이 중요함

기존 배포 방식으로는 다운타임이 발생

다운타임은 유저 경험에 문제를 야기함

인프라는 종종 '코드'로 추상화되어 관리되고 있음. 인프라 코드 또한 배포되어야 함.

배포 전략

- 롤링
- 블루그린
- 카나리

References

https://docs.aws.amazon.com/ko_kr/whitepapers/latest/practicing-continuous-integration-continuous-delivery/deployment-methods.html
https://dev.to/mostlyjason/intro-to-deployment-strategies-blue-green-canary-and-more-3a3
https://www.samsungsds.com/kr/insights/1256264_4627.html
https://learn.microsoft.com/ko-kr/azure/app-service/deploy-best-practices
https://learn.microsoft.com/ko-kr/azure/architecture/solution-ideas/articles/cicd-for-containers
https://learn.microsoft.com/ko-kr/azure/architecture/example-scenario/blue-green-spring/blue-green-spring?source=recommendations
