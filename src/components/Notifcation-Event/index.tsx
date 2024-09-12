//Importações
import React, { useState, useEffect } from "react";
import { TouchableOpacity, Animated, Text, View } from "react-native";

//Estilização
import { styles } from "./style";

//Prop
interface props {
    text: string,
}

export const NotificationEvent: React.FC<props> = ({text}) => {
    const [showMessage, setShowMessage] = useState<boolean>(false); // Controle da mensagem
    const [fadeAnim] = useState(new Animated.Value(0)); // Controle de animação de fade
    const [progressAnim] = useState(new Animated.Value(0)); // Controle de animação de progresso

    // Função para controlar a exibição da mensagem temporária
    const showTemporaryMessage = () => {
        setShowMessage(true);

        // Fade in
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();

        // Progresso e Fade out após 3 segundos
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false // não é necessário usar o driver nativo para width
        }).start();

        setTimeout(() => {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                setShowMessage(false);
            });
        }, 3000);
    };

    useEffect(() => {
        // Exibir a mensagem de "Removido"
        showTemporaryMessage();
    }, []); // Só para exibição inicial de teste

    return (
        <>
            {showMessage && (
                <View style={styles.notificationContainer}>
                    <Animated.View style={[styles.messageEvent, { opacity: fadeAnim }]}>
                        <Text style={styles.messageText}>{text}</Text>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%']
                                })
                            }
                        ]}
                    />
                </View>
            )}
        </>
    );
};
