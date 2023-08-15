# 원티드 프리온보딩 인턴십 과제

## # 기술스택
`React, ContextAPI, SCSS`
<br><br>

### [한국임상정보](https://clinicaltrialskorea.com/)의 검색 영역 클론하기<br>

<img src="https://github.com/Gridge-Test/bob-13/assets/68717963/ea644383-923f-40e1-af21-daaaafcb33aa" width="100%" style="position: relative; left: 50%; transform: translateX(-50%); max-width: 500px;"/>
<br><br>

## API Repository

https://github.com/walking-sunset/assignment-api

<br><br>

## Getting Started
1. 위 `API REPOSITORY` 클론하여 구동하기
3. 현재 프로젝트 클론하여 구동하기.
   - `npm install`
   - `npm start`
  
<br><br>

## # 커밋 컨벤션

| Tag Name | Description                                           |
| -------- | ----------------------------------------------------- |
| Feat     | 새로운 기능 추가                                      |
| Fix      | 버그수정                                              |
| Style    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| Design   | CSS 등 사용자 UI 변경                                 |
| Refactor | 코드 리팩토링                                         |
| Docs     | 문서 수정                                             |
| Chore    | 빌드 업무, 패키지 매니저, 패키지 관지라 구성 등 수정  |
| Test     | 테스트 코드, 리팩토링 테스트 코드 추가                |
| Rename   | 파일 혹은 몰더명 수정하거나 옮기는 작업만 한 경우     |
| Remove   | 파일을 삭제하는 작업만 한 경우                        |

<br><br>

## 기능 구현

### 1. API 호출별로 로컬 캐싱 구현

![api캐싱](https://github.com/gyuhoBest/wanted-preonboarding-frontend-11th-4weeks/assets/68717963/1d7efea4-8faf-4987-b3a1-d1eb83a74614)

queryKey를 기반으로 API response를 구분하고 캐싱할 수 있도록 했습니다.<b>
캐싱된 queryKey와 동일한 queryKey로 api를 요청할 경우, api 함수가 호출되지 않습니다.<br>
api 호출 여부는 console창에 `calling api`출력으로 구분합니다.

다음과 같이 설계했습니다.

- `src/contexts/QueryCache.ts`

```
class QueryCache {
  private readonly queries = new Map<any, QueryResponse<any>>();
  private readonly hashQueryKey = (queryKey: any[]) => {
    // queryKey를 배열로 받아 hash값(정수)으로 변환하는 함수
  };

  addQuery = (queryKey: any[], query: QueryResponse<any>) => {
    // queryKey를 hash값으로 변환 후, Map에 hashKey: query data형태로 저장
  };

  removeQuery = (queryKey: string[]) => {
    // queryKey를 hash값으로 변환 후, hashKey를 이용해 Map의 해당 값을 삭제
  };

  getQuery = (queryKey: string[]) => {
    // queryKey를 hash값으로 변환 후, hashKey를 이용해 Map의 해당 값을 찾기
  };

  hasValidQuery = (queryKey: string[]): boolean => {
    // queryKey를 hash 값으로 변환
    // hashKey를 기반으로 data를 찾는다.
    // 1. data를 찾지 못했다 => 무효한 값
    // 2. data를 찾았다.
    // 2-1. 만료 예정 시간(staleTime)이 현재 시간 보다 뒤에 있다. => 유효한 값
    // 2-2. 만료 예정 시간(staleTime)이 현재 시간 보다 앞에 있다. => 만료된 값
  };
}
```

<br>

- `src/contexts/QueryCacheContext`

queryCache Context를 만들어서 Root Node에 제공했습니다.

```
import { useContext, createContext } from "react";
import QueryCache from "./QueryCache";

const CacheContext = createContext<QueryCache>(new QueryCache());
export const useCache = () => useContext(CacheContext);

interface CacheProviderProps {
  children: React.ReactNode;
}

function CacheProvider({ children }: CacheProviderProps) {
  const queryCache = new QueryCache();

  return (
    <CacheContext.Provider value={queryCache}>{children}</CacheContext.Provider>
  );
}

export default CacheProvider;

```

<br>

- `src/contexts/QueryContext`

queryKey, queryFn(API함수), staleTime을 설정하여 실행시킬 수 있는 Context 제공

```
import { getStaleTime } from "utils/cacheTime";

import { useContext, createContext, useState } from "react";
import { useCache } from "./QueryCacheContext";

import type { QueryResponse, UseQueryParams } from "types/query";

interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryStateContext = createContext<QueryResponse<any>>({
  data: null,
  error: null,
  loading: false,
  staleTime: new Date(),
});
const QueryDispatchContext = createContext<
  (({ queryFn, staleTime }: UseQueryParams<string>) => Promise<void>) | null
>(null);

export const useQueryDispatchContext = () => useContext(QueryDispatchContext);
export const useQueryStateContext = () => useContext(QueryStateContext);

function QueryProvider({ children }: QueryProviderProps) {
  const [data, setData] = useState<QueryResponse<any>>({
    data: null,
    loading: false,
    error: null,
    staleTime: new Date(),
  });

  const queryCache = useCache();

  const useQuery = async ({
    queryKey,
    queryFn,
    staleTime,
  }: UseQueryParams<any>): Promise<void> => {

    if (queryCache.hasValidQuery(queryKey)) {
     // 1. queryKey를 사용해서 cache에 유효한 값이 존재하는지 검색
     // 2. 있다면 해당 값을 data state에 업데이트
     // 3. 함수 종료
    }

    // staleTime이 제공되지 않았다면 캐시 만료시간 1분이 default
    const STALE_TIME = staleTime ?? 1000 * 60;


    // 1. queryFn을 호출한다.
    // 2 - 1. 성공 => cache에 유통기한 설정값과 함께 data 저장
    // 2 - 2. 실패 => cache에 저장 X
    // 3. data state를 api response값으로 update.
  };

  return (
    <QueryStateContext.Provider value={data}>
      <QueryDispatchContext.Provider value={useQuery}>
        {children}
      </QueryDispatchContext.Provider>
    </QueryStateContext.Provider>
  );
}

```

<br>

- `src/page/SearchPage.tsx`

필요한 곳에 QueryContext를 제공

```
import SearchForm from "components/SearchForm";

import QueryProvider from "contexts/QueryContext";

function SearchPage() {
  return (
    <main>
      <QueryProvider>
        <SearchForm />
      </QueryProvider>
    </main>
  );
}

export default SearchPage;
```

<br><br>

### 2. 캐싱한 API Response에 대해 expire time 구현

만료 시간을 5초로 설정한 경우 5초가 지난 뒤에 재요청하면 API가 다시 호출 됩니다.
만료 전에 재호출하면 캐싱된 값을 사용합니다.
![apiExpired](https://github.com/gyuhoBest/wanted-preonboarding-frontend-11th-4weeks/assets/68717963/94824b9d-69fc-4451-b7aa-a94efac59d26)

만료 예정 시각을 구하거나, 만료 여부를 판단한는 util함수를 구현했습니다.

- `utils/cacheTime.ts`

```
export const getStaleTime = (staleTime: number) => {
  const current = new Date();
  const after = new Date(current.getTime() + staleTime);

  return after;
};

export const isStaled = (targetTime: Date) => {
  const current = new Date();

  if (targetTime.getTime() > current.getTime()) {
    return false;
  }

  return true;
};

```

<br><br>

### 3. 입력마다 API 호출되지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

사용자의 입력이 끝나고 `{입력한 값}ms` 뒤에 api를 호출하도록 하는 useDebounce hook을 구현했습니다.

- `hooks/useDebounce.ts`

```
import { useEffect } from "react";

export const useDebounce = (queryKey: any[], fn: () => void, time: number) => {
  useEffect(() => {
    const debounce = setTimeout(() => {
      fn();
    }, time);

    return () => {
      clearTimeout(debounce);
    };
  }, [...queryKey]);
};


useDebounce( // Component 내에서 호출 시의 모습
    [inputFocus, searchKeyword],
    () => {
      if (
        sickDispatch &&
        inputFocus &&
        searchKeyword.length &&
        selectIdx === -1
      ) {
        sickDispatch({
          queryKey: [searchKeyword],
          queryFn: async (keyword: string) => await getSicks(keyword),
          staleTime: 1000 * 5,
        });
      }
    },
    500,
  );
```

<br><br>

### 4. 키보드 만으로 추천 검색어들로 이동 가능하도록 구현

![selectresult](https://github.com/gyuhoBest/wanted-preonboarding-frontend-11th-4weeks/assets/68717963/72e49da0-ebb0-4f48-afdc-de4116935103)

다음과 같이 설계 했습니다.

- default selectIdx = -1 (selectIdx: 사용자가 선택하고자 하는 검색어의 index)
- input창에서 ArrowDown, ArrowUp Event가 발생할 경우, selectIdx가 1씩 증감

```
const handleSelectIdx = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (data?.length) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectIdx((prev) => (prev + 1) % RESULT_MAX_LENGTH);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectIdx(
          (prev) => (prev - 1 + RESULT_MAX_LENGTH) % RESULT_MAX_LENGTH,
        );
      }
    }
  };
```

<br>

- input창에 어떤 값이 입력되어 있고, selectIdx가 -1일 때만 API호출
- input창의 value가 변하면 selectIdx는 -1로 초기화

```
 useDebounce(
    [inputFocus, searchKeyword],
    () => {
      if (
        sickDispatch &&
        inputFocus &&
        searchKeyword.length &&
        selectIdx === -1
      ) {
        sickDispatch({
          queryKey: [searchKeyword],
          queryFn: async (keyword: string) => await getSicks(keyword),
          staleTime: 1000 * 5,
        });
      }
    },
    500,
  );
```
