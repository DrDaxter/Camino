export interface DataStructure{
    icon:string
    title:string,
    component:string
}

export const Data:DataStructure[] = [
    {
        icon:'car',
        title:'Tus Rutas',
        component:'UserRutas'
    },
    {
        icon:'people',
        title:'Comunidad',
        component:'UserComunidad'
    },
    {
        icon:'receipt',
        title:'Politicas de Uso',
        component:'UserPoliticas'
    },
]