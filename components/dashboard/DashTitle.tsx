import {NextPage} from 'next'

interface Props{
    DashTitle: string
}

export const DashTitle:NextPage<Props> = (Props)=> {
    const {DashTitle} = Props

    return (
        <h1 className="text-2xl font-semibold text-secondary">{DashTitle}</h1>
    )
}