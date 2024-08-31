// Importações
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Contexto
import { useAuth } from '../../context/AuthContext';

// Componentes
import { TouchButton } from '../Touch-Button';

// Estilizações
import { Themes } from '../../../global/theme';
import { styles } from "./style";

// Icones
import Icon from 'react-native-vector-icons/AntDesign';

// Props
import { ModalType } from '../../../utils/types/typeModal'; //Importando tipo, presente em utils/types
interface CustomModalProps {
    visible: boolean;
    typeModal: ModalType;
    onClose: () => void;
    onModalClose?: () => void;
}

export const ModalComponent: React.FC<CustomModalProps> = ({ visible, typeModal, onClose, onModalClose }) => {
    const {signOut} = useAuth();
    const navigation = useNavigation();

    const handleEditProfile = () => {
        onClose();
        navigation.navigate('EditProfile');
    };

    const handleLogout = async () => {
        onClose();
        await signOut();
    };

    //Função para controle do icon
    const getIconName = () => {
        switch (typeModal) {
            case 'autenticadedSucessfull':
                return 'check';
            case 'autenticadedFallied':
                return 'close';
            case 'modalInformation':
                return 'infocirlceo';
            case 'successfulEdition':
                return 'like1';
            case 'faliedEdition':
                return 'dislike1';
            default:
                return 'questioncircle'; // Adiciona um ícone padrão
        }
    };

    //Função para controle de informação do modal de acordo com o tipo
    const getModalContent = () => {
        switch (typeModal) {
            case 'autenticadedSucessfull':
                return (
                    <>
                        <Text style={styles.modalText}>Autenticação bem-sucedida</Text>
                        <Text style={styles.modalSmallText}>Clique em Continuar para seguir para a página inicial</Text>
                        <View style={styles.modalViewChoises}>
                            <TouchButton styleType='buttonSmallSolid' text='Continue' onPress={() => {
                                onClose();
                                navigation.navigate('TabNaviagtion'); // Navega para a página inicial
                            }} />
                        </View>
                    </>
                );
            case 'autenticadedFallied':
                return (
                    <>
                        <Text style={styles.modalText}>Falha na autenticação</Text>
                        <Text style={styles.modalSmallText}>Por favor, tente novamente ou entre em contato com o suporte</Text>
                        <View style={styles.modalViewChoises}>
                            <TouchButton styleType='buttonSmallSolid' text='Tentar novamente' onPress={onClose} />
                        </View>
                    </>
                );
            case 'modalInformation':
                return (
                    <>
                        <Text style={styles.modalText}>O que você gostaria de fazer?</Text>
                        <View style={styles.modalViewChoises}>
                            <TouchButton styleType='buttonSmallSolid' text='Editar Perfil' onPress={handleEditProfile} />
                            <TouchButton styleType='buttonSmallClose' text='Sair' onPress={handleLogout} />
                        </View>
                    </>
                );
            case 'successfulEdition':
                return (
                    <>
                        <Text style={styles.modalText}>Edição bem-sucedida</Text>
                        <Text style={styles.modalSmallText}>Clique em Continuar para seguir para a página de perfil</Text>
                        <View style={styles.modalViewChoises}>
                            <TouchButton styleType='buttonSmallSolid' text='Continue' onPress={() => {
                                onClose();
                                navigation.navigate('Profile');
                            }} />
                        </View>
                    </>
                );
            case 'faliedEdition' :
                return (
                    <>
                        <Text style={styles.modalText}>Falha na edição</Text>
                        <Text style={styles.modalSmallText}>Por favor, tente novamente ou entre em contato com o suporte</Text>
                        <View style={styles.modalViewChoises}>
                            <TouchButton styleType='buttonSmallSolid' text='Tentar novamente' onPress={onClose} />
                        </View>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => {
                onClose();
                if (onModalClose) onModalClose();
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.touchCloseIcon} onPress={onClose}>
                        <Icon name="close" size={25} color={`${Themes.colors.black}`} />
                    </TouchableOpacity>

                    <View style={styles.modalCircle}>
                        <Icon name={getIconName()} size={70} color={`${Themes.colors.greenAcqua}`} />
                    </View>

                    <View style={styles.contentModel}>
                        {getModalContent()}
                    </View>
                </View>
            </View>
        </Modal>
    );
};
