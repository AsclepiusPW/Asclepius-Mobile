export const Themes = {
    colors:{
    
      //Cores padrões
      white:"#FFFFFF",
      black: "#000000",
      bacgroundScreens: "#ECEBE8",

      //Verdes
      greenDark:"#2C6975",
      greenAcqua:"#68B2A0",
      greenSpring:"#CDE0C9",
      greenSpringTiny:"#E0ECDE",

      //Vermelhos
      redHot:'#EE5A5A',
  
      //Gradientes
      graydientHeader:"linear-gradient(90deg, #05E9AC, #68B2A0)",
      graydientProfilerTiny:"linear-gradient(90deg, #05E9AC, #2C6975)",
      graydientProfiler:"linear-gradient(to bottom right, #2C6975, #05E9AC)",
    },
    fonts:{
      extraLight: 'Inter_200ExtraLight',
      light:'Inter_300Light',
      regular:'Inter_400Regular',
      medium: 'Inter_600SemiBold',
      semiBold: 'Inter_600SemiBold',
      bold:'Inter_700Bold',
      extraBold:'Inter_800ExtraBold',
    },
    size:{
      tiny:"14px",
      smaller:"16px",
      small: "20px",
      lager:"24px",
      maxlager: "34px",
    },
  
  } as const