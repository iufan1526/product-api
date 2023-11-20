# 환경변수
- .env 파일에 어떤 환경변수가 추가되어야 하는지 작성합니다.
- key=value 형태에서 key만 나열합니다. value는 비밀!
외부에 노출되면 안되는 값을 지정해야합니다. 예) api key, id, password

MYSQL_HOST,
MYSQL_USERNAME,
MYSQL_PASSWORD,
MYSQL_DATABAE ,
MYSQL_PORT ,
JWT_KEY ,

# API 명세서 URL

https://docs.google.com/spreadsheets/d/14pADkgUFG4lnbbkBljGcOiPQWvTDSFiui-Em9RJh0kA/edit?usp=sharing

# ERD URL

https://www.erdcloud.com/d/gjaZEKNwbsMHQMWB7

# 더 고민해 보기

1. **암호화 방식**
단방향 암호화 입니다. 단방향 암호화를 사용했을시 복호화가 불가능하기 때문에 비밀번호 원본을 찾을수가없습니다

2. **인증 방식**
Access Token만 있으면 사용자인척 하면서 접근이 가능합니다
Access의 유효기간을 짧게 가져가고 그래서 Refresh토큰을 이용하여  Access을 다시 발급받는 형식으로 사용합니다.

4. **인증과 인가**
인증은 사용자가 이 서비스에 가입된 진짜 사용자인지 검증하는것 입니다 ex)로그인
저의 과제에서는 로그인후 토큰발급을 해주었고 middleware에는 그 토큰이 우리 서비스에서 발급한 토큰인지, 이 사용자가 어느 서비스까지 접근 가능한지에 대한 인가를 구현하였습니다.

4. **Http Status Code**
200 - 요청이 정상적으로 성공하였을때
201 - 요청이 성공한것은 동일하나 무언가 리소스가 생성되었을때
400 - 클라이언트의 요청이 잘못된경우
500 - db작업중 오류가 발생했을때

6. **리팩토링**
저는 기존 MongoDB, Mongoose 을 이용한 프로젝트를 리펙토링 한것이 아닌 처음부터 새로운 프로젝트를 만들어서 코드의 변경 정도를 정확히는 말씀드릴수 없습니다만 db가 변경되었을때 어떻게 하면 코드의 번경이 적을까에 대하여 생각해보았습니다.
제 프로젝트에선 db에 대한 정보가 config파일에 정의되어 있습니다. config파일에서 사용할 db정보들의 파일들 분리해서 config에서 참조하도록 합니다.
ex) 현재는 config에서 mysql정보만 참조하고 있지만 => dbinfo 라는 파일을 만들어서 db 정보들을 선언후 config파일에선 dbinfo 파일의 변수만 다르게 참조하는식으로 합니다.

6. **서버 장애 복구**
pm2 save를 통하여 현재 서비스를 저장합니다.pm2 startup으로 실행합니다

7. **개발 환경**
nodemon을 사용하면 개발중 변경사항이 생기면 자동으로 재부팅되어서 편합니다.
npm을 이용해서 패키지를 설치하는 방법은 크게 일반, 글로벌(`--global, -g`), 개발용(`--save-dev, -D`)으로 3가지가 있습니다. 각각의 차이점을 설명하고, nodemon은 어떤 옵션으로 설치해야 될까요?
일반은 현재 프로젝트에만 설치하는것이고 global은 내 컴퓨터 전역으로 설치합니다.개발용은 실제 서비스를 출시전 개발,테스트 환경에서만 사용할 패키지를 설치합니다.nodemon은 개발용으로 설치하면될거같습니다. 서비스 환경에서는 불필요 할것 같습니다
