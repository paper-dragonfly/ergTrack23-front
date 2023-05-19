import React from 'react'

export default function About(){
    return(
        <div> 
            <section>
                <h1>About ergTrack </h1>
                <h2>FAQ</h2>
                <h4>How do I use ergTrack?</h4>
                <p>{"Complete a workout on your Concept 2 indoor rower. Use the monitor buttons to navigate to the memory screen [Menu >  Memory > Select by Date> your-workout ] . Upload a photo of your memory screen to the ‘Add Workout’ page of ergTrack. Edit extracted data as needed. Save. Voila, that’s it.  Check out Log to view your workouts"}</p>
                <h4>What kind of  machine do I need?</h4>
                <p>ergTrack is designed to work with a Concept 2 indoor rower with a PM5 monitor. It will not work with other indoor rowing machines or earlier monitor versions</p>
                <h4>What makes for a 'good' upload photo?</h4>
                <p>For best results, take a photo straight on in good lighting that captures the complete monitor but little background beyond that </p>
                <h4>Do I have to use a photo to input my workout data?</h4>
                <p>No, therrer is an option for manual input</p>
                <h4>What metrics does ergTrack rrecord?</h4>
                <p>Date, description, distance, time, split (pace), stroke rate, comment (optional)</p>
            </section>
            <section>
                <h2>Comming in Version 2</h2>
                <h4>More Metrics</h4>
                <p>Currently ergTrack does not support recording calories, watts or heart rate</p>
                <h4>Team Log</h4>
                <p>Be part of a team and see how you stack up. In addition to your individual Log you will have access to your Team Log where you can view all the workouts submitted by team members</p>
                <h4>More Intervals/Sub-Workouts</h4>
                <p>currently you can only upload one image per workout limiting the number of intervals/sub-workouts that can be recorded to the number that can fit on a single display screen, eight. More than 8 can be recorded if using manual mode. </p>
                <h4>Graphical Comparison</h4>
                <p>Select multiple workouts and graph their metrics to easily visualize your progress</p>
            </section>
            <section>
                <h2>About Us</h2>
                <img  src='#' alt='photo KN' />
                <h4>Kathleen Noble</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, vel! Facere harum incidunt a eos vel dolorem praesentium in quos accusamus quaerat debitis error, ipsa quasi sint fugit? Non, voluptates!</p>
                <br/>
                <img src='#' alt='photo LC' />
                <h4>Laura Connor</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium repudiandae accusantium provident quaerat eius esse veniam optio earum non odio impedit, obcaecati, cumque voluptatibus fugit numquam rerum quod asperiores repellat.</p>
            </section>
        </div>

    )
}