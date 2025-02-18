let x = 0;
let blue = 0;
let orange = 0;
function generateGrid() {
    let y = 0;
    const size = document.getElementById("size").value;
    let n = parseInt(size);
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size * 2 - 1},auto)`;
    let cnt = 0;
    let pow = 0; // like as i
    let query = 0; // like as j
    let a = 2 * size - 1;
    for (let i = 0; i < n * 2 - 1; i++) {
        for (let j = 0; j < n * 2 - 1; j++) {
            const cell = document.createElement("div");
            if (i % 2 === 0 && j % 2 === 0) {
                cell.className = "dot";
            } else if (i % 2 === 0) {
                cell.className = `${"horizontal-line"}`;
                cell.setAttribute("highlight", "false");
                cell.id = `${y}`;
                y++;
            } else if (j % 2 === 0) {
                cell.className = `${"vertical-line"}`;
                cell.setAttribute("highlight", "false");
                cell.id = `${y}`;
                y++;
            }
            else {
                let a1 = a * pow + (query);
                let a2 = a * pow + (query + n - 1);
                let a3 = a * pow + (query + n);
                let a4 = a * pow + (query + (2 * n - 1));
                query++;
                if (query == n - 1) {
                    pow++;
                    cnt++;
                    query = 0;
                }
                let def_id = [a1.toString(), a2.toString(), a3.toString(), a4.toString()]
                cell.id = def_id;
                cell.setAttribute("Color", "false");
                cell.setAttribute("highlight", "true");
            }
            cell.addEventListener("click", (yy) => {
                let Id = yy.srcElement.id;
                let clr = document.getElementById(Id).getAttribute("highlight") === "false";
                if (x % 2 == 0 && clr) {
                    x++;
                    cell.setAttribute("highlight", "true");
                    document.getElementById(Id).style.backgroundColor = "blue";
                } else if (x % 2 != 0 && clr) {
                    x++;
                    cell.setAttribute("highlight", "true");
                    document.getElementById(Id).style.backgroundColor = "orange";
                }
                cell.classList.toggle("clicked");
                fill_color();
            });
            grid.appendChild(cell);
        }
    }
}
generateGrid();
function fill_color() {
    const size = document.getElementById("size").value;
    let n = parseInt(size);
    let a = 2 * n - 1;
    for (let i = 0; i <= n - 2; i++) {
        for (let j = 0; j <= n - 2; j++) {
            let E1 = a * i + j;
            let E2 = a * i + (j + n - 1);
            let E3 = a * i + (j + n);
            let E4 = a * i + (j + (2 * n - 1));
            let el1 = document.getElementById(E1.toString());
            let el2 = document.getElementById(E2.toString());
            let el3 = document.getElementById(E3.toString());
            let el4 = document.getElementById(E4.toString());
            if (el1 && el2 && el3 && el4) {
                let h1 = el1.getAttribute("highlight") === "true";
                let v1 = el2.getAttribute("highlight") === "true";
                let h2 = el3.getAttribute("highlight") === "true";
                let v2 = el4.getAttribute("highlight") === "true";
                // console.log(h1, v1, h2, v2);
                if (h1 && v1 && h2 && v2) {
                    let req_div = [E1, E2, E3, E4];
                    let req_div_id = req_div.join(","); // Convert array to string: "0,3,4,7"
                    let divElement = document.getElementById(req_div_id);
                    let clr = divElement.getAttribute("Color") === "false";
                    if (divElement && clr) {
                        if (x % 2 == 0) {
                            divElement.style.backgroundColor = "orange";
                            x--;
                            orange++;
                        } else {
                            divElement.style.backgroundColor = "blue";
                            x--;
                            blue++;
                        }
                        divElement.setAttribute("Color", "true");
                    }
                }
            }
        }
    }
    if (blue + orange == (n - 1) * (n - 1)) {
        if (blue > orange) {
            alert("Blue Won");
        } else if (orange > blue) {
            alert("Orange Won");
        } else {
            alert("Tied");
        }
    }
}
