/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Popup, TPopupRef} from './src/Popup';
import {PopupProvider} from './src/Popup.context';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const popupRef = React.useRef<TPopupRef>(null);

  const openPopup = () => {
    popupRef.current?.open();
  };
  const popupRef2 = React.useRef<TPopupRef>(null);

  const openPopup2 = () => {
    popupRef2.current?.open();
  };
  return (
    <PopupProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Button title="Open Popup" onPress={openPopup} />
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>

      <Popup
        ref={popupRef2}
        backdrop
        backdropOpacity={0.3}
        backdropColor="#ff0000">
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Popup 2</Text>
          <Text style={styles.popupContent}>Popup Contents</Text>
          <Button
            title="Open Popup1"
            onPress={() => popupRef.current?.open()}
          />
          <Button title="Close" onPress={() => popupRef2.current?.close()} />
        </View>
      </Popup>

      <Popup
        ref={popupRef}
        backdrop
        backdropOpacity={0.3}
        backdropColor="#0000ff">
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Popup 1</Text>
          <Text style={styles.popupContent}>Popup Contents</Text>
          <Button
            title="Open Popup2"
            onPress={() => popupRef2.current?.open()}
          />
          <Button title="Close" onPress={() => popupRef.current?.close()} />
        </View>
      </Popup>
    </PopupProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

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

export default App;
