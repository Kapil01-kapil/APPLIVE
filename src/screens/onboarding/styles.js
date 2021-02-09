//Imports
import { StyleSheet, Dimensions} from "react-native";

var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    main_container: {
        backgroundColor: "#fff", 
        height: '100%',
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    container : {
        flex: 1, 
        width: '100%', 
        backgroundColor: "#fff", 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    txt_style: {
        color: 'white',
        fontSize: 40,
        fontWeight: '600',
    },



  

    imageCarouselContainer: { 
        // height: height, 
        // width: width, 
        flex: 1,
        justifyContent: 'center', 
        alignItems: "center", 
    },

    imageCarouselImage: {
        width: "75%",
        resizeMode: 'contain'
    },

    imageCarouselTxt: { 
        color: "#000", 
        fontSize: 14, 
        // position: "absolute", 
        // bottom: "20%", 
        textAlign: "center" 
    },

    btnContainer: { 
        position: "absolute", 
        bottom: 20, 
        flexDirection: "row", 
        alignItems: 'center', 
        width: "80%", 
        justifyContent: 'space-between', 
    },
    btnStyle: { 
        height: 30, 
        width: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    btnImg: { 
        height: 15, 
        width: 15, 
        resizeMode: 'contain',
    },
    paginationContainer: {
        width: 50, 
        height: 50, 
        justifyContent: 'center', 
        alignItems: "center", 
    },
    paginationStyle: { 
        marginTop: 40,
        marginLeft: 20, 
        height: 10, 
        width: 10, 
        borderRadius: 5, 
        
    },
    skipBtn: { 
        position: "absolute", 
        height: 35, 
        width: 60, 
        alignItems: 'center', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: "#fff", 
        justifyContent: 'center', 
        alignSelf: 'center', 
        top: "6%", 
        right: "2%" 
    },
    skipBtnTxt: { 
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "600", 
    }










});