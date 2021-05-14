# React LifeCycle

## componentDidMount

Executado **após** o primeiro render() e útil pra requisições HTTP, por exemplo.

## componentDidUpdate

Executado **após** toda a invocação de render() e útil para aplicação de "efeitos colaterais".

## componentWillUnmount

Executado **antes** do componente "morrer" e útil para finalização de objetos, como por exemplo **clearInterval**.
