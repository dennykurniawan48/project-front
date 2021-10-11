import Head from "next/head"
const CustomHead = (props) => {
    return <Head>
        <title>{props.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Cabin&display=swap" rel="stylesheet"></link>
    </Head>
}

export default CustomHead