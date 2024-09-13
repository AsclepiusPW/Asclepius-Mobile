//Depois atualizar os valores das rotas

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Initial: undefined;
      Login: undefined;
      SignUp: undefined;
      ResetPassword: undefined;
      TabNaviagtion: undefined; // Para a navegação das abas
      Home: undefined;
      ListVaccines: undefined;
      ListEvents: undefined;
      VaccinationRegisters: undefined;
      Profile: undefined;
      DetailsEvent: {idEvent: string};
      DetailsVaccine: {idVaccine: string};
      EditProfile: undefined;
      VaccinationRequest: undefined;
    }
  }
}