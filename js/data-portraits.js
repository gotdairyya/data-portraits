// load data
d3.csv("data/answers.csv").then(data => {
    data.forEach(line => {

        const question1 = line["Do you know any women in STEM?"]
        const question2 = line["Do you think a STEM career sounds fun?"]
        const question3 = parseInt(line["Do you feel welcome in your STEM classes?"])
        const question4 = line["What do you enjoy doing outside of school? (pick up to 4)"].split(", ")
        const question5 = line["If there was one world problem you could help eliminate, what would it be?"]
        const name = line["What is your name? "]

        // Set up variables
        const portraitDim = 200;
        const threeAnswers = ["Yes", "No", "I don't know"];
        const q5Options = [
            "Climate change",
            "Hunger + Poverty",
            "Equality",
            "Animal Rights",
            "Mental Health",
            "Disease + Illness"
        ];
        const catColor = d3.scaleOrdinal(threeAnswers, ["rgb(0, 191, 128)", "rgb(193, 141, 186)", "rgb(244, 225, 83)"]);
        const q5Colors = d3.scaleOrdinal(q5Options, d3.schemeCategory10);
        const width = 250;
        const activities =
            [{
                "⚐": ["Hiking", "Winter Sports", "Running", "Climbing", "Team Sports"],
                "❃": ["Painting", "Photography", "Pottery"],
                "♫": ["Orchestra", "Choir", "Songwriting"],
                "★": ["Cooking / Baking", "Reading", "Sleeping", "Yoga"],
                "♡": ["Religious practice", "Volunteer work", "Politics"],
            }]

        function searchByValue(obj, val) {
            for (let key in obj) {
                if (obj[key].indexOf(val) !== -1) {
                    return key;
                };
            };
            return null;
        };

        // Draw the portrait
        const svg = d3.select("div#container").append("svg").attr("width", width).attr("height", width);

        svg
            .append("clipPath") // define a clip path
            .attr("id", "circle-clip") // give the clipPath an ID
            .append("circle")
            .attr("cx", width / 2)
            .attr("cy", portraitDim / 2)
            .attr("r", portraitDim / 4);

        // Create group
        const g = svg.append("g");

        const triangle = d3
            .symbol()
            .type(d3.symbolTriangle)
            .size(portraitDim * 100);

        // Draw q1
        const q1 = g.selectAll("path#q1").data(question1);

        q1.exit().remove();

        q1.enter()
            .append("path")
            .attr("d", triangle)
            .attr("id", "q1")
            .attr("fill", (d) => catColor(d))
            .attr("transform", `translate(${width / 2},${portraitDim / 2})`);

        // Draw q2
        const q2 = g.selectAll("path#q2").data(question2);

        q2.exit().remove();

        q2.enter()
            .append("path")
            .attr("d", triangle)
            .attr("id", "q2")
            .style("fill", (d) => catColor(d))
            .attr("transform", `translate(${width / 2},0)rotate(45)`)
            .attr("opacity", 0.5);

        // Draw q3
        const q3 = svg.selectAll("rect#q3").data(Array(question3).fill("1"));

        q3.exit().remove();

        q3.enter()
            .append("rect")
            .attr("id", "q3")
            .attr("fill", "white")
            .attr("x", (d, i) => i * 5)
            .attr("y", 0)
            .attr("width", 1)
            .attr("height", portraitDim * 10)
            .attr("transform", `translate(${width / 2},0)`);

        // Draw q4
        g
            .selectAll("text.q4")
            .data(question4)
            .enter()
            .append("text")
            .text((d, i) => {
                while (i < 4) { return searchByValue(activities[0], d) }
            })
            .attr("x", (d, i) => width / 2 + i * 5 - 30)
            .attr("y", (d, i) => portraitDim / 2 + i * 20 - 20)
            .attr("fill", "black")
            .classed("q4", true);

        // Draw q4
        g
            .selectAll("text.q5")
            .data(question5)
            .enter()
            .append("text")
            .text("♥")
            .attr("x", (d) => width / 2 + 15)
            .attr("y", (d) => portraitDim / 2)
            .attr("fill", (d) => q5Colors(d))
            .attr("font-size", "2em")
            .classed("q4", true);

        // Clip the images
        g.attr("clip-path", "url(#circle-clip)");

        // Size the data
        g.attr("transform", `scale(2) translate(${-width / 4},${-width / 6})`)

        svg.append("foreignObject")
            .text(name)
            .attr("fill", "black")
            .attr("height", width)
            .attr("width", width)
            .attr("x", width / 4)
            .attr("y", width - 20)
    })
});