# g2pko
정규표현식을 기반으로한 간단한 한국어 g2p

## 개발 환경 준비
환경 설정은 Makefile을 통해 자동화 하였습니다.
Docker 환경을 빌드하고, 앱을 실행 할 수 있습니다.

```bash
make build # 도커이미지 빌드
make tag
make dev # 도커 환경 실행 및 접속
make install # 의존성 설치
make run # 앱 실행
```

실행 중인 Docker 환경에 접속하려는 경우 `make enter`를 사용하면 됩니다.
