//Importações
import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList, Dimensions } from "react-native";

//Estilização
import { ComponentNewsList, ListTitle, Title } from "./style";
import { Themes } from "../../../global/theme";

//Icones
import Icon from 'react-native-vector-icons/Entypo';

//Components
import { NewsComponent } from "../HomeNews-Component";

//Test
import { ArrayNews } from "../../../utils/tests/arrayNews";
import { News } from "../../../utils/types/typeNews";

export const NewsList = () => {
    const [news, setNews] = useState<News[]>(ArrayNews);

    const handleChangePress = () => {
        Alert.alert("Clicou nos três pontos")
    }
    return (
        <ComponentNewsList>
            <ListTitle>
                <Title>Informações</Title>

                <TouchableOpacity onPress={handleChangePress}>
                    <Icon name="dots-three-horizontal" size={20} color={`${Themes.colors.black}`} />
                </TouchableOpacity>
            </ListTitle>

            <FlatList
                data={news}
                renderItem={({ item }) => (
                    <View style={{ width: Dimensions.get('window').width * 0.83, marginRight: 10 }}>
                        <NewsComponent
                            description={item.description}
                            title={item.title}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                style={{ marginBottom: 20 }} />
        </ComponentNewsList>
    )
}