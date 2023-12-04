console.log(`---------------------SBA 308: JavaScript--------------------`)
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  // The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
 /*  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ]; */
    const uniqueLearnerID = [...new Set(LearnerSubmissions.map(item => item.learner_id))]; //['A', 'B']
      console.log(uniqueLearnerID)
      const result = [];


  console.log(result)


    /* if (CourseInfo.id === 1){
      for LearnerSubmission.learner_id
      foreach assignment_id(let index =0; index < Array.length; index++) {
        const element = array[index];
      }
 */
        
 //   }

 //    return result;
  

 //   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//    console.log(result);


//    console.log(CourseInfo.id);

//  if CourseInfo.id !==AssignmentGroup.course_id {
//      return an error 'invalid course ID'
//  }

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions){



//how to get today's date in a format that we can compare with the due date
// stackoverflow 
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;



//getting the ID and the possible  max points for each assignment that is already due.
//all the results are saved first in objects which are pushed in an Array.
 const possiblePoints = []
 AssignmentGroup.assignments.forEach(function(obj) {
  if (obj.due_at <= today ){
    let maxPossiblePointForId={'idAsiignment': obj.id,'pointsMaxPossible': obj.points_possible}
    possiblePoints.push(maxPossiblePointForId)
  }else if(isNaN(obj.id)){
    throw `The id is not a number`  
  }

})
console.log(`Object of ID's and points max for each assignment due`)
console.log(possiblePoints)


// total sum of max possible points  of assesment 1(50p) + assesment 2(150p) 
let sumOfPossiblePoints = 0
possiblePoints.forEach(function(obj){
  sumOfPossiblePoints+= obj.pointsMaxPossible
})
console.log(`Maximum possible points from the due assignments is : ${sumOfPossiblePoints}`) // 200

// another way to calculete total max possible points
/* 
let sumOfPossiblePoints= possiblePoints[0].pointsMaxPossible + possiblePoints[1].pointsMaxPossible;
console.log(sumAalll); */

//getting only learners ids second option 
const ids  = []

  LearnerSubmissions.forEach(function(id) {
  try{
    if(id.learner_id>0){
      if (!ids.includes(id.learner_id)){
        ids.push(id.learner_id)
      }
    } else {
    throw "The number is negative"
    }
  }catch (error){
   console.log(error);
 }
})
console.log(` learners Id's # are : ${ids}`)

//calculating points that each student have for all tasks and saving  id and total points to list of objects
function calculateStudentPoints (index){
let score = 0 
for(let i = 0; i < LearnerSubmissions.length; i ++){
    possiblePoints.forEach(function(x){
      if (LearnerSubmissions[i].assignment_id === x.idAsiignment && LearnerSubmissions[i].learner_id === ids[index]){
        score += LearnerSubmissions[i].submission.score
        id = LearnerSubmissions[i].assignment_id
        }else{
        }
      })
  }
let learnerSubmitionData ={'id': ids[index], 'score': score}
return learnerSubmitionData
}
 
//calculation avarage points for each of the sturents by deviding their points by the total points available
const learnerIdAndAvg = [] 
for (person in ids){
  //console.log(calculateStudentPoints(person).score)
  //console.log(ids[person])
  avg = calculateStudentPoints(person).score / sumOfPossiblePoints
  learnerIdAndAvg.push({'id' : ids[person], 'avg' : avg })
} 
console.log(`---Learner Id and avarage result-----`)
console.log(learnerIdAndAvg)


let result = []
for (let i in learnerIdAndAvg){
  id = learnerIdAndAvg[i].id
  avg = learnerIdAndAvg[i].avg
  assignment_id = possiblePoints[i].idAsiignment
  result.push({id: id, avg : avg, assignment_id : assignment_id})
}
console.log(result)


};
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions))