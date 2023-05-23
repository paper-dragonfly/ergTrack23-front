import React from 'react'
import { Collapse } from 'antd'
import { BsPencil, BsEye, BsLaptop } from 'react-icons/bs'
import { HiMagnifyingGlass } from 'react-icons/hi2'
export default function About(){
    
    const { Panel } = Collapse


    return(
        <div className='lg:px-32 lg:space-y-10 lg:py-10 '> 
            <h1 className='text-2xl text-center font-bold mt-6'>About ergTrack </h1>
            <section className='px-10 md:flex md:pt-6 md:gap-14 md:justify-center'>
                <div className='md:flex md:flex-col md:w-10/12 md:items-center md:bg-bgGrey md:p-6 md:rounded-xl'>
                <BsPencil size={30} />
               <h4 className='text-xl font-bold pt-2'>Record</h4>
                <p className='pt-2 pb-4'>
                    ergTrack uses computer vision to extract workout data from a photograph of a Concept2 RowErg memory screen 
                </p>
                </div>
                <div className='md:flex md:flex-col md:w-10/12 md:items-center md:bg-bgGrey md:p-6 md:rounded-xl'>
                <BsLaptop size={30}/>
                <h4 className='text-xl font-bold pt-2'>View</h4>
                <p className='py-4'>
                    Checkout your Log to see the summary metrics for all your workouts. Select a specific entry to view interval/sub-workout details 
                </p>
                </div>
                <div className='md:flex md:flex-col md:w-10/12 md:items-center md:bg-bgGrey md:p-6 md:rounded-xl'>
                <HiMagnifyingGlass size={30}/>
                <h4 className='text-xl font-bold pt-2'>Compare</h4>
                <p className='py-4'>
                    Filter and sort Log entries to compare workouts
                </p>
                </div>
            </section>
            <section className='py-6 px-10'>
                <h2 className='text-2xl font-bold  pb-4'>FAQ</h2>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="How do I use ergTrack?" key='1'>
                    <p>{"Complete a workout on your Concept 2 indoor rower. Use the monitor buttons to navigate to the memory screen [Menu >  Memory > Select by Date> your-workout ] . Upload a photo of your memory screen to the ‘Add Workout’ page of ergTrack. Edit extracted data as needed. Save. Voila, that’s it. Check out Log to view your workouts"}</p>
                    </Panel>
                

                    <Panel header="What kind of  machine do I need?" key='2'>
                    <p>ergTrack is designed to work with a Concept 2 indoor rower with a PM5 monitor. It will not work with other indoor rowing machines or earlier monitor versions</p>
                    </Panel>
              
                    <Panel header="What makes for a 'good' upload photo?" key='3'>
                    <p>For best results, take a photo straight on in good lighting that captures the complete monitor but little background beyond that</p>
                    </Panel>

                    <Panel header="Do I have to use a photo to input my workout data" key='4'>
                    <p>No, there is an option for manual input</p>
                    </Panel>

                    <Panel header="What metrics does ergTrack record?" key='5'>
                    <p>Date, description, distance, time, split (pace), stroke rate, comment (optional)</p>
                    </Panel>
                </Collapse>
            </section>
            <section className='bg-bgGrey pl-10 pr-20 mt-4 py-6'>
                <h2 className='text-2xl font-bold py-6'>Coming in Version 2</h2>
                <h4 className='text-xl font-bold'>More Metrics</h4>
                <p className='pb-6'>Currently ergTrack does not support recording calories, watts or heart rate</p>
                <h4 className='text-xl font-bold'>Team Log</h4>
                <p className='pb-6'>Be part of a team and see how you stack up. In addition to your individual Log you will have access to your Team Log where you can view all the workouts submitted by team members</p>
                <h4 className='text-xl font-bold'>More Intervals/Sub-Workouts</h4>
                <p className='pb-6'>Currently you can only upload one image per workout limiting the number of intervals/sub-workouts that can be recorded to the number that can fit on a single display screen, eight. More than 8 can be recorded if using manual mode. </p>
                <h4 className='text-xl font-bold'>Graphical Comparison</h4>
                <p className='pb-6'>Select multiple workouts and graph their metrics to easily visualize your progress</p>
            </section>
            <section className='pl-10 pr-20 py-6'>
                <h2 className='text-2xl font-bold  pb-2'>About Us</h2>
                <img  src='#' alt='photo KN' />
                <h4 className='font-bold'>Kathleen Noble</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, vel! Facere harum incidunt a eos vel dolorem praesentium in quos accusamus quaerat debitis error, ipsa quasi sint fugit? Non, voluptates!</p>
                <br/>
                <img src='#' alt='photo LC' />
                <h4 className='font-bold'>Laura Connor</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium repudiandae accusantium provident quaerat eius esse veniam optio earum non odio impedit, obcaecati, cumque voluptatibus fugit numquam rerum quod asperiores repellat.</p>
            </section>
        </div>

    )
}