# 주요 로직 설명

## 1. 상태 관리 (State Management)

### App.jsx의 상태 변수

```javascript
const [isLoading, setIsLoading] = useState(false); // 로딩 중인지 여부
const [isLoaded, setIsLoaded] = useState(false); // 데이터가 로드되었는지 여부
```

**상태 조합:**

- `isLoading = false, isLoaded = false`: 초기 상태 (스켈레톤 표시)
- `isLoading = true, isLoaded = false`: 로딩 중 (스켈레톤 표시, 버튼 비활성화)
- `isLoading = false, isLoaded = true`: 로드 완료 (실제 콘텐츠 표시)

## 2. 토글 로직 (handleToggle)

### 버튼 클릭 시 동작

```javascript
const handleToggle = () => {
  if (isLoaded) {
    // 이미 로드된 상태 → 스켈레톤으로 되돌리기
    setIsLoaded(false);
    setIsLoading(false);
  } else {
    // 스켈레톤 상태 → 로딩 시뮬레이션 시작
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 2000); // 2초 후 로드 완료
  }
};
```

**로직 흐름:**

1. **로드 완료 상태**일 때: 즉시 스켈레톤 상태로 전환
2. **스켈레톤 상태**일 때:
   - `isLoading = true`로 설정 (버튼 비활성화)
   - 2초 후 `isLoading = false`, `isLoaded = true`로 변경
   - 실제 콘텐츠 표시

## 3. 조건부 렌더링 (Conditional Rendering)

### 화면 표시 로직

```javascript
{!isLoaded ? (
  // 스켈레톤 컴포넌트들
  <div id="content">
    <SkeletonCard />
    <SkeletonListItem />
    <SkeletonListItem />
    <SkeletonImageCard />
  </div>
) : (
  // 실제 콘텐츠 컴포넌트들
  <div id="loadedContent" className="fade-in">
    <Card ... />
    <ListItem ... />
    <ListItem ... />
    <ImageCard ... />
  </div>
)}
```

**핵심 포인트:**

- `isLoaded` 상태에 따라 완전히 다른 컴포넌트를 렌더링
- 스켈레톤과 실제 콘텐츠는 **동일한 레이아웃 구조**를 가짐
- 로드 완료 시 `fade-in` 애니메이션 클래스 적용

## 4. 스켈레톤 애니메이션

### CSS 애니메이션 원리

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0; /* 그라데이션이 오른쪽 밖에 위치 */
  }
  100% {
    background-position: -200% 0; /* 그라데이션이 왼쪽 밖으로 이동 */
  }
}
```

**작동 원리:**

1. 배경을 200% 너비의 그라데이션으로 설정
2. 그라데이션을 좌우로 이동시키며 "빛나는" 효과 생성
3. `infinite`로 무한 반복
4. 중간 색상(`#e0e0e0`)이 밝아 보여 로딩 효과 구현

## 5. 컴포넌트 구조

### 스켈레톤 컴포넌트

```javascript
// SkeletonCard.jsx
function SkeletonCard() {
  return (
    <div className="card">
      <div className="skeleton skeleton-avatar"></div>
      <div className="card-content">
        <div className="skeleton skeleton-text skeleton-text-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>
      </div>
    </div>
  );
}
```

**특징:**

- 실제 콘텐츠와 **동일한 레이아웃 구조**
- `skeleton` 클래스로 애니메이션 적용
- 크기와 모양은 실제 콘텐츠와 일치

### 실제 콘텐츠 컴포넌트

```javascript
// Card.jsx
function Card({ avatar, title, content, small }) {
  return (
    <div className="card">
      <div className="avatar">{avatar}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{content}</p>
        {small && <p className="small">{small}</p>}
      </div>
    </div>
  );
}
```

**특징:**

- Props로 데이터를 받아 표시
- 스켈레톤과 **동일한 클래스명** 사용 (`card`, `card-content`)
- 조건부 렌더링 (`small && ...`)

## 6. 전체 흐름도

```
[초기 상태]
isLoading: false
isLoaded: false
→ 스켈레톤 UI 표시

[버튼 클릭]
→ isLoading: true
→ 버튼 비활성화, "로딩 중..." 텍스트

[2초 후]
→ isLoading: false
→ isLoaded: true
→ 실제 콘텐츠 표시 (fade-in 애니메이션)

[다시 버튼 클릭]
→ isLoaded: false
→ isLoading: false
→ 스켈레톤 UI로 되돌아감
```

## 7. 실제 사용 시나리오

### API 호출 예시

```javascript
// 실제 프로젝트에서 사용하는 예시
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData().then((result) => {
    setData(result);
    setLoading(false);
  });
}, []);

return (
  <>
    {loading ? (
      <SkeletonCard />
    ) : (
      <Card title={data.title} content={data.content} />
    )}
  </>
);
```

**핵심 개념:**

- 로딩 상태와 데이터 상태를 분리
- 로딩 중에는 스켈레톤 표시
- 데이터 로드 완료 후 실제 콘텐츠로 전환

## 8. 장점

1. **사용자 경험 향상**: 빈 화면 대신 로딩 상태 표시
2. **레이아웃 안정성**: 실제 콘텐츠와 동일한 크기로 레이아웃 시프트 방지
3. **시각적 피드백**: 애니메이션으로 로딩 중임을 명확히 전달
4. **재사용성**: 컴포넌트화로 여러 곳에서 사용 가능
