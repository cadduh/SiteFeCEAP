const express = require("express");
const server = express();

//conf nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true
});

//config arquivos estaticos (css, scripts, imgs)
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true}))


const bd = require("./bd")

// const projetos = [
//     {
//         img:"https://cdn-icons-png.flaticon.com/512/4897/4897032.png",
//         title:"O advento de battle royalle, um estudo sobre Free Fire",
//         category:"Administração",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
//         url:"#"
//     },
//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/560/560906.svg",
//         title:"Por que a Terra NÃO é plana?",
//         category:"Ciências",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
//         url:"#"
//     },
//     {
//         img:"https://cdn-icons-png.flaticon.com/512/937/937220.png",
//         title:"Satélite caseiro",
//         category:"Engenharia",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
//         url:"#"
//     },
//     {
//         img:"https://cdn-icons-png.flaticon.com/512/4982/4982412.png",
//         title:"Baratas fazem mal",
//         category:"Biologia",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
//         url:"https://pt.wikipedia.org/wiki/Barata"
//     },
//     {
//         img:"https://cdn-icons-png.flaticon.com/512/4954/4954038.png",
//         title:"Organizando seus estudos",
//         category:"Organização",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
//         url:"https://pt.wikipedia.org/wiki/Barata"
//     },
//     {
//         img:"https://cdn-icons-png.flaticon.com/512/4954/4954242.png",
//         title:"Átomos não têm tamanho",
//         category:"Física",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aliquid repellat tempora illum unde hic dolorum doloribus ipsum quibusdam",
//         url:"https://pt.wikipedia.org/wiki/Barata"
//     }
    
// ]

//rota padrao /
server.get("/", function(req, res){
    //const msg = "Tá funcionado o nunjucks";
    //Faça com que seja enviado ao site apenas os 3 últimos projetos da coleção
    //Cosultar Dados
    bd.all("SELECT * FROM projetos", function(err, rows){
        if(err) return console.log(err)
        let projetosRevert = [...rows].reverse();
        let ultimosProjetos = [];
        for (projeto of projetosRevert){
            if (ultimosProjetos.length < 3){
                ultimosProjetos.push(projeto);
        }
    }
        return res.render("index.html", { rows: ultimosProjetos });
        console.log(rows)
    })
    
    
});



//rota para pag projects.html
server.get("/projetos", function(req, res){
    bd.all("SELECT * FROM projetos", function(err, rows){
        if(err) return console.log(err)
        console.log(rows)
        return res.render("projects.html", { rows });
    })
})

server.get("/view", function(req, res){
    return res.render("viewProject.html");
});

//metódo POST

server.post("/", function(req,res){
    //Inserir Dados
    const query = `
    INSERT INTO projetos(
        img,
        title,
        category,
        description,
        url
    ) VALUES (?,?,?,?,?)` ;
    const values = [req.body.image, req.body.title, req.body.category, req.body.description, req.body.url];
    bd.run(query, values, function(err){
        if(err) return console.log(err);        
        console.log("Dado armazenado com sucesso!");
    });

    return res.redirect("/projetos");
})

server.listen(3000);



//1 - Verif. se o no de tá instalado
// node -v
//2 - Iniciar o projeto Node
//npm init -y
//3 - Instalar o express - criador de servidores
// npm i express
//Meu console - OhMyZSH
