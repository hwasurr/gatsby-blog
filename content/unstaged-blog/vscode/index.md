---
title: VSCode 유용한 단축키 모음
date: "2021-04-01"
tags: [IDE]
description: VSCode 유용한 단축키 모음
---

### ctrl + p로 파일 찾기

### F2로 변수명 한번에 변경하기

### 폴더와 파일 동시 생성

Vscode 팁2
파일만들때 이름을 some-folder/some-nested-folder/file.js 와 같이 하면 폴더도 자동으로 생성해준다

### 다중 커서

ctrl(command) + alt

### 동일 단어 다중 선택

VScode 팁
해당 단어 여러개 선택 -> 단어 앞에 커서를 두고 ctrl + d  (command + d)연타한다 -> 해당 단어와 동일한 단어가 선택 (편집됨) 

### 나만의 스니펫

vscode 꿀팁
자신만의 스니펫 만드는 법
사진 1같은 코드는 리액트 컴포년트를 생성할 때면 언제나 작성해야되는 코드. 이런 걸 스니펫으로 처리 가능
command + shift + p
“user snippets” 입력 및 선택
typescriptreact 선택
이후 열리는 json 파일에 자기가 넣고싶은 스니펫 작성 (사진 2처럼)
이후 편집기에서 prefix 필드에 작성한 글자를 입력 -> 엔터 -> 스니펫대로 작성됨 (사진2번대로면 rf -> 엔터)

### Organize imports

vscode 팁
리팩토링, import 미관리 등으로 import가 엉망이 되었을 때
shift + option + o  => organize imports  => 매직

### move to a new file

vscode 팁 2
리팩토링 할때, 함수 하나를 다른 파일로 따로 만들고 싶을때
해당 함수 이름 위에서 오른쪽 클릭 => refactor => "move to a new file"
또는 해당 함수 이름 위에서 ctrl(command) + shift + R => "move to a new file"