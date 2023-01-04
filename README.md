# react-native-surfinn-popup

surfinn-ui의 팝업 컴포넌트로 팝업의 기본 기능만을 제공하며, 뷰는 완전히 사용자 설정으로 사용할 수 있습니다.
모든 팝업은 `<PopupProvider></PopupProvider>`가 선언된 위치에 표시됩니다.  
팝업은 필요한 곳에서 `<Popup ref={popupRef}></Popup>`을 사용하여 정의합니다.
`ref`는 `remove`, `open`, `close` 메소드를 포함하는 객체입니다. `ref`의 메소드로 팝업을 조종합니다.

`<PopupProvider/>`은 가능하면 네비게이션의 상위 노드로 설정하기를 권장합니다. 모든 `Popup`은 `PopupProvider`가 정의된 위치에 표시됩니다. React Navigation의 하위 노드로 `PopupProvider`를 추가하면 스크린의 헤더가 팝업의 백드롭에 가려지지 않습니다.

`Popup`은 오픈한 순서대로 쌓이고 가장 마지막에 오픈한 팝업이 가장 위에 표시됩니다. `ref.current.open()`를 사용하면 이미 열린 팝업을 맨앞으로 불러올 수 있습니다. `open()`을 여러번 호출해도 같은 팝업을 중복 생성하지 않습니다.

팝업의 모양이나 기능은 온전히 사용자의 몫입니다. 원하는 모양과 필요한 기능으로 팝업을 작성하고 `<Popup></Popup>`으로 감싸면 단순 알림을 위한 팝업, 컨펌 또는 좀더 복잡한 모달로 사용할 수 있습니다.

> 주의 - ref.current.remove()를 호출하면 그 팝업은 다시 오픈할 수 없습니다. 팝업은 언마운트될 때 삭제됩니다.

## 설치

npm

```sh
npm install --save react-native-surfinn-popup
```

yarn

```sh
yarn add react-native-surfinn-popup
```

> `react-native-reanimated`를 사용하고 있습니다. 설치는 [여기](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)를 참조하세요.

## 사용방법

```ts
import {PopupProvider, Popup, TPopupRef} from 'react-native-surfinn-popup';

const App = () => {
  const popupRef = React.useRef<TPopupRef>(null);

  const openPopup = () => {
    popupRef.current?.open();
  };

  return (
    <PopupProvider>
      <Button title="Open Popup" onPress={openPopup} />

      <Popup ref={popupRef} backdrop backdropOpacity={0.3}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Popup</Text>
          <Text style={styles.popupContent}>Popup Contents</Text>
          <Button title="Close" onPress={() => popupRef.current?.close()} />
        </View>
      </Popup>
    </PopupProvider>
  );
};

const styles = StyleSheet.create({
  popup: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    borderRadius: 10,
    height: 200,
    width: '80%',
    padding: 24,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  popupContent: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});
```

## 속성

| 이름                | 타입    | 기본값      | 설명               |
| ------------------- | ------- | ----------- | ------------------ |
| **backdrop**        | boolean | `false`     | 백드롭 보임 / 숨김 |
| **backdropColor**   | string  | `'#000000'` | 백드롭 색상        |
| **backdropOpacity** | string  | `0.2`       | 백드롭 투명도      |


## 소스
https://github.com/surfinn-ui/popup.git