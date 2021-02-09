//TODO:- imports
import React, { Component } from 'react';
import { View, Image, Text,BackHandler, Alert } from 'react-native';
import ImageCarousel, { Pagination } from "react-native-snap-carousel";
import styles from './styles';
import AssetsImages from '../../res';
import { CONST } from '../../utils/constants'
import SingleLineBtn from '../../components/single_line_btn';
import TxtFullScreenBtn from '../../components/txt_full_screen_btn'
import SafeAreaContainer from '../../components/safearea_container'

//TODO:- Onboarding class
export default class Onboarding extends Component {

    //TODO:- constructor
    constructor(props) {
        super(props);
        this.state = {
            //Variables for popup
            title: "",
            bodyTxt: "",
            isPopUpOpened: false,
            //Onboard data
            dataSource: [
                {
                    url: AssetsImages.app_onboarding_1,
                    title: "Sign Up",
                    note: "Lorem ipsum dolor sit amet, consectetur adipiscing\nelit. Duis lectus metus, mollis id sagittis sit ame.",
                    img_width: "65%"
                }, {
                    url: AssetsImages.app_onboarding_2,
                    title: "Request Service",
                    note: "Lorem ipsum dolor sit amet, consectetur adipiscing\nelit. Duis lectus metus, mollis id sagittis sit ame.",
                    img_width: "65%"

                }, {
                    url: AssetsImages.app_onboarding_3,
                    title: "Fill Up",
                    note: "Lorem ipsum dolor sit amet, consectetur adipiscing\nelit. Duis lectus metus, mollis id sagittis sit ame.",
                    img_width: "75%"
                },
            ],
            activeSlide: 0,
        };
    }

    //TODO:- class life cycle
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
      handleBackButton = () => {
        // alert(JSON.stringify(this.props.navigation.isFocused()))//this.props.route.name
        if (this.props.navigation.isFocused()) {
          Alert.alert(
            'Exit App',
            'Exiting the application?', [{
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            }, {
              text: 'OK',
              onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
          }
          )
          return true;
        }
      }
    
    //TODO:- OnBoarding
    _renderItem({ item, index }) {
        return (
            <View style={styles.imageCarouselContainer}>
                <Image style={{ width: item.img_width, resizeMode: 'contain', position: "absolute", }}
                    source={item.url} />
                <View style={{ flex: 1 }} />
                <Text style={{ color: "#000", fontSize: 24, textAlign: "center", fontWeight: 'bold' }} allowFontScaling={false}>{item.title}</Text>
                <Text style={{ color: "#747A93", fontSize: 14, textAlign: "center", marginTop: 20 }} allowFontScaling={false}>{item.note}</Text>
            </View>
        );
    }

    //TODO:- render event
    render() {
        return (
            <SafeAreaContainer
                title={this.state.title}
                bodyTxt={this.state.bodyTxt}
                isModalOpened={this.state.isPopUpOpened}
                onDismiss={() => {
                    this.setState({ isPopUpOpened: false })
                }}
            >
                <View style={styles.container}>
                    <ImageCarousel
                        ref={c => {
                            this._carousel = c;
                        }}
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        sliderWidth={CONST.DEVICE_WIDTH}
                        sliderHeight={CONST.DEVICE_HEIGHT / 1.6}
                        itemHeight={CONST.DEVICE_HEIGHT / 1.6}
                        layout={"default"}
                        itemWidth={CONST.DEVICE_WIDTH}
                        autoplay={true}
                        autoplayInterval={3000}
                        autoplayDelay={1000}
                        loop={true}
                        onSnapToItem={index => this.setState({ activeSlide: index })}
                    />
                    <View style={styles.paginationContainer}>
                        <Pagination
                            data={this.state.dataSource}
                            dotsLength={this.state.dataSource.length}
                            activeDotIndex={this.state.activeSlide}
                            dotColor={"#FF5C22"}
                            dotStyle={styles.paginationStyle}
                            inactiveDotColor={"#D9DAE3"}
                            inactiveDotOpacity={0.6}
                            inactiveDotScale={1}
                        />
                    </View>
                    <View style={{ height: "20%", width: "100%", alignItems: 'center', justifyContent: 'flex-end', }}>

                        <SingleLineBtn
                            txt={"Already have an account?"}
                            btnTxt={" Login here"}
                            onPress={() => {
                                this.props.navigation.navigate("Login");
                            }}
                        />
                        <TxtFullScreenBtn
                            title={"SIGN UP"}
                            onPress={() => {
                                this.props.navigation.navigate("SignupOption");
                            }}
                            disabled={false}
                            containerStyle={{
                                backgroundColor: '#FF5C22',
                                marginTop:25,
                                marginBottom:20
                            }}
                        />
                    </View>
                </View>
            </SafeAreaContainer>
        );
    }
}

