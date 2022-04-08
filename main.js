const itSchool = {
    // свойства
    name: "School",
    description: "Modern online school",
    maxGroupCount: 5,
    maxStudentsCount: 13,
    // свойства-массивы
    availableCourses: ["Front-end Pro", "Front-end Basic"],
    startedGroups: [],

    // courseName: "Front-end Pro", amountOfStudents: 10
    __callback: {},


    startLearningGroup(courseName, amountOfStudents){
        if(this.availableCourses.includes(courseName)){
            if(amountOfStudents <= this.maxStudentsCount){
                if(!this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)){
                    this.startedGroups.push({courseName, amountOfStudents});
                    this.dispatch("GROUP_STARTED", courseName);
                }
                else{
                    console.log(`Group with ${courseName} already started.`);
                }
            }
            else{
                console.log(`We not supperted ${amountOfStudents} amount of students.`);
            }
        }
        else{
            console.log(`Sorry, course ${courseName} not supported yet.`);
        }
    },
    endLearningGroup(courseName){
      if(this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)){
        this.startedGroups = this.startedGroups.filter((startedGroup) => startedGroup.courseName !== courseName);
        this.dispatch("GROUP_ENDED", courseName);
      }
      else{
          console.log(`You are trying to finish not existing lerning group! `);
      }
    },

    on(eventName, callback) {
        this.__callback[eventName] = callback;
    },

    dispatch(eventName, data){
        this.__callback[eventName] && this.__callback[eventName](data);
    }
};

itSchool.on(
    "GROUP_STARTED",
    (courseName) => console.log(`A new group on the ${courseName} course has started!`),
);


itSchool.on(
    "GROUP_ENDED",
    (courseName) => console.log(`Group ${courseName} course has completed!`),
);



// старт групп
itSchool.startLearningGroup("Front-end Pro", 10);
itSchool.startLearningGroup("Front-end Basic", 13);
itSchool.startLearningGroup("Python Basic", 6);

// конец групп
itSchool.endLearningGroup("Front-end Basic");
itSchool.endLearningGroup("Python Basic");