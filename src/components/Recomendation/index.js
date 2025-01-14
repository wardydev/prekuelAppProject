import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

import useFetch from '../../hooks/useFetch';
import {URLRECOMMENDATION} from '../../utils/constants/urls';
import TagTitle from '../atomic/TagTitle';
import TitleList from '../atomic/TitleList';
import AutorTitle from '../atomic/AutorTitle';
import TimeList from '../atomic/TimeList';
import HeaderTitle from '../HeaderTitle';
import {shuffleData} from '../../utils/functions/shuffleData';
import {BANNERADD} from '../../utils/constants/admobString';

const Recomendation = () => {
  const {data} = useFetch(URLRECOMMENDATION);
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    if (index === 2) {
      return (
        <View style={styles.bannerAdContainer}>
          <BannerAd
            unitId={BANNERADD}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('Article', {
            itemId: item.id,
            title: item.title.rendered,
            thumbnail:
              item.better_featured_image.media_details.sizes.medium.source_url,
            authorImage:
              item.yoast_head_json.schema['@graph'][4]['image']['url'],
            authorName: item.yoast_head_json.twitter_misc['Written by'],
            date: item.date,
            source: item.content.rendered,
            link: item.link,
          })
        }>
        <Image
          style={styles.imageList}
          source={{
            uri: item.better_featured_image.media_details.sizes.medium
              .source_url,
          }}
        />
        <View style={styles.titleContainer}>
          <TagTitle categoryId={item.categories[0]} isPrimary={true} />
          <TitleList title={item.title.rendered} />
          <View style={styles.footerList}>
            <AutorTitle
              author={item.yoast_head_json.twitter_misc['Written by']}
              isLarge={false}
            />
            <TimeList minutes={item.date} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <HeaderTitle title="Spesial Buat Kamu 😍" />
      <FlatList
        data={shuffleData(data)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  imageList: {
    width: 100,
    height: 110,
    borderRadius: 12,
    marginRight: 20,
  },
  titleContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  footerList: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 6,
  },
  bannerAdContainer: {
    marginVertical: 26,
  },
});

export default Recomendation;
