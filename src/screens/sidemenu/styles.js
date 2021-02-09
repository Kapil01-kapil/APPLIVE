//Imports
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    main_container: {
        backgroundColor: "#00000000", 
        height: '100%'
    },
    container : {
        flex: 1, 
        width: '100%', 
        backgroundColor: "#00000000", 
        // alignItems: 'center', 
        // justifyContent: 'center', 
    },
    txt_style: {
        color: 'white',
        fontSize: 40,
        fontWeight: '600',
    },
    flatlist: {
        width: "100%",
        flex: 1,
        marginTop: 15,
    },
    flatlist_btn: {
        height: 45,
        width: "100%",
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center'
        
    },

    flatlist_txt: {
        fontSize: 24,
        marginLeft: 14,
        fontWeight: 'bold',
        fontFamily: "Avenir",
        
    },
    flatlist_sub_txt: {
        fontSize: 18,
        marginLeft: 14,
        fontWeight: '500',
        fontFamily: "Avenir"
    }

});