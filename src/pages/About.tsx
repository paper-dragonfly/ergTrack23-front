import React from 'react'
import { Collapse } from 'antd'
import { BsPencil, BsEye, BsLaptop } from 'react-icons/bs'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import laura from '../assets/laura.jpeg'
import kathleen_headshot from '../assets/headshot.jpeg'

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

                    <Panel header="What photo formats does ergTrack accept?" key='6'>
                    <p>Images must be of type jpeg, png, tiff or pdf and less than 5MB</p>
                    </Panel>

                    <Panel header="Do I have to use a photo to input my workout data" key='4'>
                    <p>No, there is an option for manual input</p>
                    </Panel>

                    <Panel header="What metrics does ergTrack record?" key='5'>
                    <p>Date, description, distance, time, split (pace), stroke rate, comment (optional)</p>
                    </Panel>
                </Collapse>
            </section>
            <section className='bg-bgGrey px-10 mt-4 py-6 md:pr-20'>
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
            <section className='px-10 py-6 md:pr-20'>
                <h2 className='text-2xl font-bold'>About Us</h2>
                <div className='flex flex-col mt-8 md:flex-row md:gap-7 items-center'>
                    <img  src={kathleen_headshot} alt='photo KN' className='headshot'/>
                    <div className='flex flex-col'>
                        <h4 className='font-bold text-xl py-2 text-center md:text-left'>Kathleen Noble</h4>
                        <p>Kathleen is an Ugandan Olympic Rower and full stack software engineer. She began rowing at Princeton University as a walk-on to the lightweight women’s crew team and has been rowing ever since. She conceived the idea for ergTrack during winter training when she realized her only system for tracking erg workouts consisted of taking photos and then proceeding to do nothing with them. Conversations with other rowers revealed that this was a common phenomenon. At that time she did not have sufficient programming skills to build her envisioned image-to-database app but as she continued to dive deeper into software, building ergTrack remained a goal.</p>
                    </div>
                </div>
                <div className='flex flex-col mt-10 md:flex-row md:gap-7 items-center'>
                    <img src={laura} alt='photo LC' className='headshot'/>
                    <div className='flex flex-col'>
                        <h4 className='font-bold text-xl py-2 text-center md:text-left'>Laura Connor</h4>
                        <p>Laura is a full stack software engineer. Always curious and creative, Laura stumbled into web     development while trying to solve a problem. She was starting a business selling her handmade clothing and needed an online store. As she dove into building the site, she quickly   discovered code as an exciting new medium. She has been     learning and building ever since.</p>
                    </div>
                </div>

            </section>
        </div>

    )
}