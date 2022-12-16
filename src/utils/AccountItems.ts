export interface DataStructure{
    icon:string
    title:string,
    component:string
}

export const Data:DataStructure[] = [
    {
        icon:'person-outline',
        title:'Perfil',
        component:'UserRutas'
    },
    {
        icon:'car-outline',
        title:'Tus Rutas',
        component:'UserRutas'
    },
    {
        icon:'people-outline',
        title:'Comunidad',
        component:'UserComunidad'
    },
    {
        icon:'receipt-outline',
        title:'Politicas de Uso',
        component:'UserPoliticas'
    },
    {
        icon:'settings-outline',
        title:'Configuraciones',
        component:'UserPoliticas'
    },
]