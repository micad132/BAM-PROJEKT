import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    width: '90%',
    marginTop: 10,
    gap: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-evenly',
    paddingTop: 5,

    singleInfo: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 5,

      numberInfo: {
        fontWeight: 'bold',
        fontSize: 17,
      },
    },
  },
});

interface Props {
    productCount: number,
    storageCount: number,
}

const ContentTable = ({ productCount, storageCount }: Props) => (
  <View style={styles.wrapper}>
    <View style={styles.wrapper.singleInfo}>
      <Text>Products registered in database</Text>
      <Text style={styles.wrapper.singleInfo.numberInfo}>{productCount}</Text>
    </View>
    <View style={styles.wrapper.singleInfo}>
      <Text>Storages registered in database</Text>
      <Text style={styles.wrapper.singleInfo.numberInfo}>{storageCount}</Text>
    </View>
  </View>
);

export default ContentTable;
