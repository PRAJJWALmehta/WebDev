const render_completion = () => {
    user_data = $.get("course_progress", (data, status) => {
        console.log(data);
        for(let x in data){
            switch(x){
    
                case "1":
                    one_.classList.add("active")
                    break
                case "2":
                    two_.classList.add("active")
                    break
                case "3":
                    three_.classList.add("active")
                    break
                case "4":
                    four_.classList.add("active")
                    break
                case "5":
                    five_.classList.add("active")
                    break
                case "6":
                    six_.classList.add("active")
                    break
                case "7":
                    seven_.classList.add("active")
                    break
                case "8":
                    eight_.classList.add("active")
                    break
                case "9":
                    nine_.classList.add("active")
                    break
                default:
                    console.log(x, typeof(x));
            }
        }
    });

}

render_completion()

const one_ = document.querySelector(".one");
const two_ = document.querySelector(".two");
const three_ = document.querySelector(".three");
const four_ = document.querySelector(".four");
const five_ = document.querySelector(".five");
const six_ = document.querySelector(".six");
const seven_ = document.querySelector(".seven");
const eight_ = document.querySelector(".eight");
const nine_ = document.querySelector(".nine");











one_.onclick = () => {
    $.get("/course/1");
    render_completion();

}
two_.onclick = () => {
    $.get("/course/2");
    render_completion();

}
three_.onclick = () => {
    $.get("/course/3");
    render_completion();

}
four_.onclick = () => {
    $.get("/course/4");
    render_completion();

}
five_.onclick = () => {
    $.get("/course/5");
    render_completion();
}
six_.onclick = () => {
    $.get("/course/6");
    render_completion();
}
seven_.onclick = () => {
    $.get("/course/7");
    render_completion();
}
eight_.onclick = () => {
    $.get("/course/8");
    render_completion();
}
nine_.onclick = () => {
    $.get("/course/9");
    render_completion();
}










