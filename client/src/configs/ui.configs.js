const uiConfigs ={
    style :{
        gradienBgImage:{
            dark :{
                backgroundImage:"linnear-gradien(to top, rgba(0,0,0,1),rgba(0,0,0,0)"
            },
            light :{
                backgroundImage:"linnear-gradien(to top, rgba(245,245,245,1),rgba(0,0,0,0)"

            }
        },
        horizontailGradientBgImage:{
            dark :{
                backgroundImage:"linnear-gradien(to top, rgba(0,0,0,1),rgba(0,0,0,0)"
            },
            light :{
                backgroundImage:"linnear-gradien(to top, rgba(245,245,245,1),rgba(0,0,0,0)"

            }
        },
        typoLines:(lines,textAlign) =>({
            textAlign : textAlign || "justify",
            display:"-webkit-box",
            overflow:"hidden",
            WebkitBoxOrient:"vertical",
            WebkitLineClamp : lines

        }),
        mainContent :{
            maxWidth:"1366px",
            margin:"auto",
            padding :2
        },
        backgroundImage :(imgPath) =>({
            position:"relative",
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundColor:"darkgrey",
            backgroundImage:`url(${imgPath})`
        }),
        size :{
            sidebarWidth :"300px",
            contentMaxWidth:"1366px"
        }
    }
}

export default uiConfigs;