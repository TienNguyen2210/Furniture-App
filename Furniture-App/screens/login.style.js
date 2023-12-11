import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from "../constants/index";

const styles = StyleSheet.create({
    cover: {
        height: SIZES.height/2.4,
        width: SIZES.width-60,
        resizeMode: "contain",
        marginBottom: SIZES.xxLarge,
    },

    title: {
        fontFamily: "bold",
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        alignItems: "center",
        marginBottom: SIZES.xxLarge
    },

    wrapper: {
        marginBottom: 20,
        
    },

    label: {
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right",

    },

    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center"
    }),

    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginTop: 5,
        marginLeft: 5,
    },

    registerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    registration: {
        color: "blue",
    }

})

export default styles