import React from 'react'


class Hero extends React.Component {
    render() {
        console.log(`${sessionStorage.getItem('visited')} это значение`)
        const { localtime } = this.props
        let welcome = ''

        if(localtime >= 5 && localtime <= 11) {
            welcome = 'Good Morning'
        }

        if(localtime >= 22 && localtime <= 4) {
            welcome = 'Good Night'
        }

        if(localtime >= 12 && localtime <= 21) {
            welcome = 'Good Evening'
        }


        return <h1>{ welcome }. Welcome back</h1>
        
        
    }
}
export default Hero