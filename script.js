let score_valeur = 0;
let index = 0;
let questions = [
    {
        question : "Quel est le synonyme de sincère ?",
        reponses : ["Hypocrite", "Honnête", "méfiant", "Retenu"],  
        reponse_correct : "Honnête"
    },
    {
        question : "Quel est le synonyme de rapide",
        reponses : ["Lent", "Vif", "Doucement", "Tard"],    
        reponse_correct : "Vif"
    },
    {
        question : "Quel est le synonyme de facile ?",
        reponses : ["difficile", "dur", "simple", "complexe"],  
        reponse_correct : "simple"
    },
    {
        question : "Quel est l'antonyme de facile ?",
        reponses : ["difficile", "dur", "simple", "complexe"],  
        reponse_correct : "difficile"
    }
];

function depart(){
    document.body.innerHTML = `
    <h2 id="question"></h2>
    <div id="reponses"></div>
    <div id = "score_suivant">
        <p id="score">Score :${score_valeur}</p>
        <button id="suivant">Suivant</button>
    </div>
    `
    document.querySelector("#question").textContent = questions[index].question;
    const rep = document.getElementById("reponses");
    questions[index].reponses.forEach(reponse => {
        const rep_button = document.createElement("button");
        rep_button.innerHTML = `${reponse}`;
        rep_button.addEventListener('click', () =>{
            const buttons = document.querySelectorAll("#reponses button");
            buttons.forEach(button =>{
                button.disabled = true;
            })
            if (reponse === questions[index].reponse_correct) {
                score_valeur = score_valeur + 1;
                document.getElementById("score").innerText = "Score :" + score_valeur;
                rep_button.style.backgroundColor = "green";
            } 
            else {
                rep_button.style.backgroundColor = "red";
                buttons.forEach(button => {
                    if(button.textContent === questions[index].reponse_correct){
                        button.style.backgroundColor = "green";
                    }
                })
            }
            document.getElementById("suivant").style.display = "block";
            question_suivante();
        }, {once : true});
        rep.appendChild(rep_button);
    })
}
function question_suivante(){
    document.getElementById("suivant").addEventListener('click', () =>{
        index++;
        if(index < questions.length){
            depart();
        }
        else{
            quiz_terminer();
        }
    })
}
function quiz_terminer(){
    let niveau_estimé;

    if(score_valeur <= 2){
        niveau_estimé = "A1"}
    else if(score_valeur > 2 && score_valeur <= 4){
        niveau_estimé = "A2" }
    else if(score_valeur > 4 && score_valeur <= 6){
        niveau_estimé = "B1"}
    else if(score_valeur > 6 && score_valeur <= 8){
        niveau_estimé = "B2" }
    
    document.body.innerHTML = `
    <h3 id="finale_score">Votre score est de : ${score_valeur} sur 10</h3>
    <p id="niveau">Votre Niveau est de : ${niveau_estimé}</p>
    <button id="redémarrer">Redémarrer</button>
    `
    localStorage.setItem("score_finale", score_valeur);
    for(let i = 0; i < questions.length; i++){
    let random_question = Math.floor(Math.random() * questions.length);
    let temp = questions[i];
    questions[i] = questions[random_question];
    questions[random_question] = temp;
    }
       
        document.getElementById("redémarrer").addEventListener('click', ()=>{
            document.body.innerHTML = `
            <h1>Test de Connaissance du Français</h1>
            <button id="demarrer" onclick="depart()">Démarrer le quiz</button>
            `
            score_valeur = 0;
            index = 0;
        })
}