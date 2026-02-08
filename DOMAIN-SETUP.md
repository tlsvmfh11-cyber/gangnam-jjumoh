# 도메인 설정 가이드

## Vercel 도메인 연결

### 1️⃣ Vercel 대시보드 접속
- https://vercel.com/dashboard
- gangnam-jjumoh-guide 프로젝트 클릭

### 2️⃣ 도메인 설정
1. 상단 메뉴에서 **"Settings"** 클릭
2. 좌측 메뉴에서 **"Domains"** 클릭
3. **"Add"** 버튼 클릭
4. `gangnam-jjumoh-guide.com` 입력
5. **"Add"** 클릭

### 3️⃣ DNS 설정 (도메인 등록업체에서)

Vercel이 제공하는 DNS 레코드를 도메인 등록업체(가비아, 후이즈 등)에 추가:

#### A 레코드:
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME 레코드:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 4️⃣ SSL 인증서 (자동)
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- 약 5-10분 소요

### 5️⃣ 확인
- https://gangnam-jjumoh-guide.com 접속
- HTTPS 자동 리다이렉트 확인
