[[[
title : WebGL 엔진 개발 - 1 전체적인 레이아웃
date : 2021-11-27 17:13:12
series : "Make WebGL Graph Engine"
tags : ["과제", "webgl", "dev log"]
]]]

## 들어가기 앞서
대학 강의 중 컴퓨터 그래픽스에 관련된 강의에서 WebGL에 관련한 자유 주제 과제가 나오게 되었습니다. 과제 제출 기간은 2021-12-17일까지이기에 글 작성일 기준 20일 가량 남았네요.

시간이 충분히 여유롭기 때문에 개인적인 도전정신으로 WebGL을 이용해 간단한 2D 게임 엔진을 제작하는 것이 목적입니다. 물론 시간이 많이 길지는 않기도 하며, 개인적인 실력이 뛰어나지 않기에 게임 엔진이라고 부르기는 뭐한, 사실상 렌더링 프레임워크정도가 될 것 같습니다.

단순히 렌더링 프레임워크를 구현해보는 것은 DirectX, Vulkan으로도 여러번 해보았기때문에 이번에는 실제 상용 게임엔진에서 많이 사용되는 그래픽 프로그래밍 툴까지 같이 제작해볼 계획입니다.

게임 엔진에서 쉽고 빠르게 개발할 수 있도록 그래픽 프로그래밍 툴을 제공하는 경우는 상당히 많이 있습니다. 대표적으로 언리얼의 블루프린트가 있을 수 있고, 최근 유니티에서도 도입되었죠. 

![Unreal engine blueprint example](https://docs.unrealengine.com/4.27/Images/ProgrammingAndScripting/Blueprints/QuickStart/BPQS_6_Step4.png)

그래프처럼 그래픽 프로그래밍 툴은 개발자에게도 쉽게 접근할 수 있지만, 비개발직군인 디자이너, 기획자에게도 많은 활용 기회를 줄 수 있습니다.

물론 이번에 개발해볼 툴은 많은 기능과, 높은 활용도를 제공할 시간이 부족하기 때문에, 제한적인 기능과 프로토타이핑이 가능한 정도로 개발해볼 생각입니다.

언리얼의 블루프린트와 스크래치(그 블록 코딩 맞습니다!)에서 많은 영감을 받았습니다.

## 전체적인 레이아웃

### 제약 사항
시간이 많이 여유롭지는 않기 때문에 그래프 툴을 사용할 유저에게 몇 가지(사실은 매우 많은) 제약 사항이 있습니다.

첫 번째로는 제가 미리 정의한 블록만 사용 가능합니다. 사실 가능하면 별도의 전처리 작업이나, decorator를 통해 클래스에 대한 메타데이터를 자동으로 생성해서(블루프린트처럼..) 자동으로 사용할 수 있는 블록에 추가하고 싶지만, 세상에는 한 분의 교수님만 계신게 아니라 여러 과제가 주어졌기 때문에 시간이 촉박하네요.

때문에 미리 입력과 출력이 정해져있고, 호출할 함수의 내용을 별도로 작성하도록 합니다.(이부분은 스크래치에서 영감을 받았습니다.)

두 번째로 그래프 툴을 이용해 블록 코딩 중에는 별도의 에러가 표시되지 않습니다. 

가능하면 타입 체킹을 통해 블록을 연결할 수 있는지 없는지 유효성 검사를 수행하고 싶지만, 위와 같은 이유로 최대한 간단하게 구현하고자 합니다.

세 번째로 사용자 정의 함수는 구현하지 않습니다. 첫 번째 이유와 동일하게 간단하게 프로토타이핑 정도만 가능하도록 주어진 함수로만 그래프를 구성할 수 있도록 합니다.

### 게임 엔진 - 전체적인 클래스 구조

![plain game engine class diagram](./assets/images/simple-webgl-engine/game-source-code-simple.png)

간단하게 작성한 전체적인 게임 엔진 내 소스 구조입니다.

기본적으로 GrpahableObject는 이름에서도 알 수 있듯이 그래프에서 생성하고 함수를 호출할 수 있는 오브젝트를 나타내빈다.

그래프에서 흐름이 될 Start, Update 함수를 선언하고, 해당 오브젝트를 WebGL에서 렌더링 하는 Render 함수를 선언합니다.

그리고 GraphableObject를 World와 Entity 클래스가 상속합니다. 

World 클래스는 World내 스폰된 entity의 목록과 World를 보이는 카메라 객체를 가지게 됩니다.

Entity 클래스는 실제로 World에 스폰될 수 있는 개체를 가리킵니다. 그리고 Entity를 상속한 Sprite 클래스는 이미지를 입력받아서 해당 이미지를 출력하는 Entity가 될 것 같습니다.

구체적인 내용들은 구현하면서 구체화 하면 될 것 같습니다.

### 그래프 툴 - 전체적인 구현 방법
그래프 툴은 게임 내 요소가 아닌 UI 요소이기 때문에 WebGL을 이용해 처음부터 UI 요소를 만드는 것은 쉬운 일은 아닙니다. 때문에 HTML5를 이용해 블록을 옮기고, 다른 블록과 연결할 수 있는 그래프 툴을 구현합니다.

바닐라 자바스크립트를 그대로 사용하는 것이 아닌, svelte나, reactjs, vuejs와 같은 웹 프레임워크를 사용하여 해당 웹 프레임워크에서 활용할 수 있는 재사용성, 반응성, 기능들을 활용하여 빠르게 개발할 수 있도록 하겠습니다.

게임 엔진의 소스 코드와 그래프 툴은 기본적으로 한 페이지 내에서 동작하고, 같은 소스 코드를 공유합니다.

하지만, 그래프 툴에서 실질적으로 게임 엔진을 동작시키는 것이 아니기때문에, 게임 엔진의 소스 코드를 기반으로 하는(상속하는) 메타 데이터를 JSON 형식으로 선언하여, 그래프 툴에서 해당 블록들을 생성하고 연결할 수 있는 형태로 구현할 생각입니다.

일반적으로 스크래치에서도 블록들을 JSON 파일에 선언하여 구현하는 형태입니다.