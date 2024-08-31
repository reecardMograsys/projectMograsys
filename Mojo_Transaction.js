



(function () {
  "use strict";
  var obj1, temp, opr, comp;
  var main,
    deletefin = [];
  var finanacecode = [];
  var simsController = angular.module("sims.module.Incidence");
  var flag = false;
  simsController.run(function ($rootScope, $templateCache) {
    $rootScope.$on("$viewContentLoaded", function () {
      $templateCache.removeAll();
    });
  });

  simsController.controller("mojoCont", [
    "$scope",
    "$state",
    "$rootScope",
    "$timeout",
    "gettextCatalog",
    "$http",
    "ENV",
    function (
      $scope,
      $state,
      $rootScope,
      $timeout,
      gettextCatalog,
      $http,
      ENV
    ) {
      var loginuser = $rootScope.globals.currentUser.username;
      $scope.emp_search = loginuser;
      $scope.created_user = loginuser;
      $scope.busyindicator = true;
      $scope.markobtained =true;
      $scope.popup =true;
      $scope.skillpositive =true;
      $scope.skillnegetive =false;
      $scope.gradeadd = true;
      $scope.gradedelete = true;
      $scope.totaladd = true;
      $scope.removeall = true;
      $scope.studimg =false;
      $scope.studavatar =true;
   $scope.negetive_score = true;
      $scope.user_access = [];
      $scope.delete_admin = false;
      $scope.edt={};
       $scope.temp0=[];
     $scope.one=false;
     $scope.twoN=true;
     $scope.isIconShown = false;
     $scope.isAvatarShown = true;
     $scope.ispointshown = true;
     $scope.isIconVisible = false;

      $http
      .get(
        ENV.apiUrl + "api/StudentDetentionTransactionController/getskilldatanew"
      )
      .then(function (res1) {
         
        $scope.data= res1.data;
        $scope.imageUrl1 =
        "https://assets.mograsys.com/Images/mojo/skills/";
      });

      // $http
      // .get(
      //   ENV.apiUrl + "api/StudentDetentionTransactionController/getstudentskinnew2?user_code=" +
      //   $scope.emp_search

    
      // )
      // .then(function (res1) {
         
      //   $scope.studentskintest1= res1.data;

      //   $scope.imageUrl1 =
      //   "https://assets.mograsys.com/Images/mojo/skills/";
      // });

      $scope.toggleFunction = function() {
         
        if ($scope.isAvatarShown) {
            // Call showimg() if avatar is currently shown
            $scope.showimg();
        } else {
            // Call showavatar() if avatar is not currently shown
            $scope.showavatar();
        }

        // Toggle the state
        $scope.isAvatarShown = !$scope.isAvatarShown;
    };

    $scope.shownegetivepoints = function() {
       
      if ($scope.ispointshown) {
          // Call showimg() if avatar is currently shown
          $scope.negetive_score = false;
      } else {
          // Call showavatar() if avatar is not currently shown
          $scope.negetive_score = true;
      }

      // Toggle the state
      $scope.ispointshown = !$scope.ispointshown;
    };

  $scope.toggleIcon = function() {
    const icon = document.getElementById('gear');

    if ($scope.isIconShown) {
        // Call showimg() if avatar is currently shown
       $scope.isIconShown=true;
       console.log('hel')

    } else {
        // Call showavatar() if avatar is not currently shown
        $scope.isIconShown=false;
        console.log('hello')
    }

    // Toggle the state
    $scope.isIconShown = !$scope.isIconShown;
};

      
      $http
        .get(
          ENV.apiUrl +
            "api/StudentDetentionTransactionController/getUserAccessRights"
        )
        .then(function (usr_rights) {
           
          $scope.user_rights = usr_rights.data;

          for (var i = 0; i < $scope.user_rights.length; i++) {
            if (i == 0) {
              $scope.user_access["Admin"] =
                $scope.user_rights[i].sims_access_application_mapping_user_code;
              if ($scope.user_access["Admin"] == "Admin") {
                $scope.delete_admin = true;
              } else {
                $scope.delete_admin = false;
              }
            }
          }

       
        });
     
      $scope.datasend = [];
      $scope.leveldata = [];
      $scope.Empdata = [];
      $scope.global_stud_arr = [];
      $scope.global_stud_arr_after_emp = [];
      $scope.user_details;
     
      $http
        .get(
          ENV.apiUrl + "api/StudentDetentionTransactionController/getCuriculum"
        )
        .then(function (res1) {
          $scope.cur_data = res1.data;
          $scope.sims_Cur = $scope.cur_data[0].sims_cur_code;
          $scope.getAcademic_year($scope.cur_data[0].sims_cur_code);
        });

        $http
        .get(
          ENV.apiUrl + "api/StudentDetentionTransactionController/getskilldata"
        )
        .then(function (res1) {
          $scope.records = res1.data;
          $scope.imageUrl1 =
          "https://assets.mograsys.com/Images/mojo/skills/";
           
        });
        $scope.showavatar=function () {
          $scope.studimg =false;
      $scope.studavatar =true;
        }
        $scope.showimg=function () {
          $scope.studimg =true;
      $scope.studavatar =false;
        }

       
     $scope.getAcademic_year = function (cur_code1) {
        
       $http
         .get(
           ENV.apiUrl +
             "api/StudentDetentionTransactionController/getAcademicYear?curCode=" +
             cur_code1
         )
         .then(function (res1) {
           $scope.acad_data = res1.data;
           $scope.sims_academic_year = $scope.acad_data[0].sims_academic_year;
           $scope.getClassN($scope.sims_academic_year);
           $scope.getAllGrades();
      
         });
     };
       
     $scope.getskinnew =function (enroll_no,sims_student_img,student_name,sims_grade_code,sims_section_code,sims_cur_code,sims_academic_year) {
      $scope.sims_enroll_no = enroll_no;
      $scope.sims_student_img = sims_student_img;
      $scope.student_name = student_name;
      $scope.sims_grade_code = sims_grade_code;
      $scope.sims_section_code = sims_section_code;
      $scope.sims_cur_code = sims_cur_code;
      $scope.sims_academic_year = sims_academic_year;
     
      $("#myModal6").modal("show");
      $http
      .get(
        ENV.apiUrl +
          "api/StudentDetentionTransactionController/getstudentskin"
      )
      .then(function (res1) {
        $scope.sims_skill_typecode="";
        $scope.studentskin = res1.data;
        $scope.sims_skill_typecode =$scope.studentskin[1].sims_skill_typecode;
        $scope.getskinimage($scope.sims_skill_typecode);
      });
      
     }

     $scope.assignimage= function(sims_skin_filepath,sims_skin_code,sims_skin_name,
      sims_enroll_no,sims_grade_code,sims_section_code,sims_academic_year){
 
$scope.savedata1 = [];

var datasend = {
   
        sims_skin_filepath : sims_skin_filepath,
        sims_mojo_skill_code :sims_skin_code,
        sims_skin_name :sims_skin_name,
        sims_mojo_section_code : sims_section_code,
        sims_mojo_enroll_number :sims_enroll_no,
        sims_mojo_grade_code :sims_grade_code,
        sims_mojo_academic_year :sims_academic_year,
        sims_mojo_transaction_created_user_code :$scope.emp_search,

  };
  $scope.savedata1.push(datasend);



$http
.post(
ENV.apiUrl +
  "api/StudentDetentionTransactionController/InsertDetentionmojostudentskin",
$scope.savedata1
)
.then(function (msg) {
     
    $scope.msg1 = msg.data;
 
    if ($scope.msg1 == true) {
        $scope.savedata1 = [];
        $('.modal-backdrop').remove();

         
        $http
   .get(
     ENV.apiUrl + "api/StudentDetentionTransactionController/getstudentskinnew2?cur_code=" +
     $scope.sims_Cur +
     "&acad_year=" +
     $scope.sims_academic_year +
     "&grade_code=" +
     sims_grade_code +
     "&section_code=" +
     sims_section_code  +
     "&user_name=" +
     loginuser 

 
   )
   .then(function (res1) {
      
     $scope.studentskintest1= res1.data;

     $scope.imageUrl1 =
     "https://assets.mograsys.com/Images/mojo/skills/";
   });

    }
    });
     }


     $scope.getskinimage = function(sims_skill_typecode){
       
      $http
      .get(
        ENV.apiUrl +
          "api/StudentDetentionTransactionController/getskinimage?skintype=" +
          sims_skill_typecode
      )

      .then(function (res1) {
         
        
        $scope.getskin = res1.data;
        $scope.imageUrl1 =
        "https://assets.mograsys.com/Images/mojo/skills/";
      });

     }
    //  $scope.shownegetivepoints = function () {
    //   $scope.negetive_score = false;
    //  }
      $scope.showpostiveskill = function () {
       
      $scope.skillpositive =true;
      $scope.skillnegetive =false;
      }
      $scope.shownegetiveskill = function () {
           
          $scope.skillpositive =false;
          $scope.skillnegetive =true;
          }
  

          $scope.getStudentListnew = function(sims_Cur,sims_academic_year,sims_grade_code,sims_section_code){
   
$scope.cur_code_new =sims_Cur;
$scope.acad_year_new =sims_academic_year;
$scope.grade_new =sims_grade_code;
$scope.section_new = sims_section_code;

          $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getStudentListNew?cur_code=" +
             sims_Cur +
              "&acad_year=" +
              sims_academic_year +
              "&grade_code=" +
              sims_grade_code +
              "&section_code=" +
              sims_section_code
          )
          .then(function (res1) {
               
           
               
            $scope.totalstudentlist = res1.data;
           
          }); 
          $("#myModal5").modal("show");
          $scope.popup =false;
          
          $http
          .get(
            ENV.apiUrl + "api/StudentDetentionTransactionController/getskilldata"
          )
          .then(function (res1) {
            $scope.records = res1.data;
        
             
            $http
            .get(
              ENV.apiUrl + "api/StudentDetentionTransactionController/getSkillcount?enroll_number=" +
              enroll_no +
              "&user_name=" +
              loginuser
            )
            .then(function (res) {
              $scope.skillcount = res.data;
             
            });
            });
        
           }


    $scope.getskillstudent= function (enroll_no,sims_student_img,sims_student_full_name,sims_grade_code,sims_section_code,sims_cur_code,sims_academic_year){
      

      $scope.enroll_number = enroll_no;
      $scope.sims_student_full_name = sims_student_full_name;
      $scope.sims_student_img = sims_student_img;
      $scope.sims_grade_code = sims_grade_code;
      $scope.sims_section_code = sims_section_code;
      $scope.sims_cur_code = sims_cur_code;
      $scope.sims_academic_year = sims_academic_year;
      //$scope.sims_skin_filepath = sims_skin_filepath;
        $("#myModal4").modal("show");
        $scope.popup =false;
       

        $http
        .get(
          ENV.apiUrl + "api/StudentDetentionTransactionController/getskilldata"
        )
        .then(function (res1) {
          $scope.records = res1.data;

           
          $http
          .get(
            ENV.apiUrl + "api/StudentDetentionTransactionController/getSkillcount?enroll_number=" +
            enroll_no +
            "&user_name=" +
            loginuser
          )
          .then(function (res) {
            $scope.skillcount = res.data;
           
          });
         
        });
       
            
      };
           
      $scope.removepoints= function (enroll_no,sims_student_full_name,sims_skill_skin_code,sims_skill_name,sims_skill_code,sims_skill_point,sims_grade_code,sims_section_code,sims_cur_code,sims_academic_year,sims_skill_typecode,sims_student_img){
            
        $('.modal-backdrop').remove();
     
        $scope.savedata = [];
        $scope.sims_student_full_name_1 = sims_student_full_name;
        $scope.sims_skill_name_1 = sims_skill_name;
        $scope.sims_skill_point_1 = sims_skill_point;
        
        $scope.enroll_no = enroll_no;
        $scope.file_path = sims_skill_skin_code;
        $scope.img = sims_student_img
        var datasend = {
           
    
    sims_mojo_academic_year :sims_academic_year,
    sims_mojo_grade_code :sims_grade_code,
    sims_mojo_section_code : sims_section_code,
    sims_mojo_enroll_number :enroll_no,
    sims_mojo_skill_code :sims_skill_code,
    sims_mojo_transaction_created_user_code :$scope.emp_search,
    sims_mojo_type_code     : sims_skill_typecode
          };
          $scope.savedata.push(datasend);
      


    $http
      .post(
        ENV.apiUrl +
          "api/StudentDetentionTransactionController/removeDetentionmojo",
        $scope.savedata
      )
        .then(function (msg) {
             
           
            $scope.msg1 = msg.data;
         
            if ($scope.msg1 == true) {
                $scope.savedata = [];
               
                  $scope.gradedelete = false;
                  
              $timeout(function() {
                $scope.gradedelete = true; // Hide the modal after 5 seconds
            }, 2000);
        
            $http
            .get(
              ENV.apiUrl +
                "api/StudentDetentionTransactionController/getclasstypecount?grade_code=" +
                sims_grade_code +
                "&section_code=" +
                sims_section_code +
                "&user_name=" +
                loginuser
            )
            .then(function (res1) {
                    
              $scope.classtypecount = res1.data;
               
              $http
              .get(
                ENV.apiUrl +
                  "api/StudentDetentionTransactionController/getclassskillcount?grade_code=" +
                  sims_grade_code +
                  "&section_code=" +
                  sims_section_code +
                  "&user_name=" +
                loginuser
              )
              .then(function (res1) {
                   
                $scope.classskillcount = res1.data;
               });
             });
            
            
                
                $scope.closemodal2(enroll_no);
            }
          });
          
        };
     
      $scope.markpoints= function (enroll_no,sims_student_full_name,sims_skill_skin_code,sims_skill_name,sims_skill_code,sims_skill_point,sims_grade_code,sims_section_code,sims_cur_code,sims_academic_year,sims_skill_typecode,sims_student_img){
           
          $('.modal-backdrop').remove();
       
          $scope.savedata = [];
          $scope.sims_student_full_name_1 = sims_student_full_name;
          $scope.sims_skill_name_1 = sims_skill_name;
          $scope.sims_skill_point_1 = sims_skill_point;
          
          $scope.enroll_no = enroll_no;
          $scope.file_path = sims_skill_skin_code;
          $scope.img = sims_student_img
          var datasend = {
             
      sims_mojo_cur_code : sims_cur_code,
      sims_mojo_academic_year :sims_academic_year,
      sims_mojo_grade_code :sims_grade_code,
      sims_mojo_section_code : sims_section_code,
      sims_mojo_enroll_number :enroll_no,
      sims_mojo_skill_code :sims_skill_code,
      sims_mojo_skill_point :sims_skill_point,
      sims_mojo_transaction_created_user_code :$scope.emp_search,
      sims_mojo_remark :$scope.student_remark,
      sims_mojo_transaction_status :$scope.sims_appl_parameter,
      sims_mojo_type_code     : sims_skill_typecode
            };
            $scope.savedata.push(datasend);
        
  

      $http
        .post(
          ENV.apiUrl +
            "api/StudentDetentionTransactionController/InsertDetentionmojo",
          $scope.savedata
        )
          .then(function (msg) {
               
              $scope.msg1 = msg.data;
           
              if ($scope.msg1 == true) {
                  $scope.savedata = [];
                 
                    $scope.gradeadd = false;
                    
                $timeout(function() {
                  $scope.gradeadd = true; // Hide the modal after 5 seconds
              }, 2000);
          
              $http
              .get(
                ENV.apiUrl +
                  "api/StudentDetentionTransactionController/getclasstypecount?grade_code=" +
                  sims_grade_code +
                  "&section_code=" +
                  sims_section_code  +
                  "&user_name=" +
                  loginuser
              )
              .then(function (res1) {
                      
                $scope.classtypecount = res1.data;
                $http
                .get(
                  ENV.apiUrl +
                    "api/StudentDetentionTransactionController/getclassskillcount?grade_code=" +
                    sims_grade_code +
                    "&section_code=" +
                    sims_section_code +
                    "&user_name=" +
                  loginuser
                )
                .then(function (res1) {
                     
                  $scope.classskillcount = res1.data;
                 });
               });
              
              
                  
                  $scope.closemodal2(enroll_no);
              }
            });
            
          };
          $scope.markpointsfullclass= function (cur_code_new,acad_year_new,grade_new,section_new,sims_skill_skin_code,sims_skill_name,sims_skill_code,sims_skill_point,sims_skill_typecode){
              
           $scope.sims_skill_skin_code_1 = sims_skill_skin_code;
           $scope.sims_skill_name_1 = sims_skill_name;
           $scope.sims_skill_point_1 = sims_skill_point;
           $scope.class_name_grade = grade_new ;
           $scope.class_name_section = section_new;
            $('.modal-backdrop').remove();
         
            $scope.savedata = [];
          
            var datasend = {
               
        sims_mojo_cur_code : cur_code_new,
        sims_mojo_academic_year :acad_year_new,
        sims_mojo_grade_code :grade_new,
        sims_mojo_section_code : section_new,
        
        sims_mojo_skill_code :sims_skill_code,
        sims_mojo_skill_point :sims_skill_point,
        sims_mojo_transaction_created_user_code :$scope.emp_search,
        sims_mojo_remark :$scope.student_remark,
        sims_mojo_transaction_status :$scope.sims_appl_parameter,
        sims_mojo_type_code     : sims_skill_typecode
              };
              $scope.savedata.push(datasend);
          
    
  
        $http
          .post(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/InsertDetentionmojoall",
            $scope.savedata
          )
            .then(function (msg) {
                 
                $scope.msg1 = msg.data;
             
                if ($scope.msg1 == true) {
                    $scope.savedata = [];
                   
                      $scope.totaladd = false;
                      
                  $timeout(function() {
                    $scope.totaladd = true; // Hide the modal after 5 seconds
                }, 2000);
            
                $http
              .get(
                ENV.apiUrl + "api/StudentDetentionTransactionController/getTotalSkillcount?user_name=" +
                loginuser
              )
              .then(function (res) {
                $scope.Total_count = res.data;
  
              });
              $http
              .get(
                ENV.apiUrl +
                  "api/StudentDetentionTransactionController/getclasstypecount?grade_code=" +
                  grade_new +
                  "&section_code=" +
                  section_new +
                  "&user_name=" +
                loginuser
              )
              .then(function (res1) {
                      
                $scope.classtypecount = res1.data;
               });
               $http
               .get(
                 ENV.apiUrl +
                   "api/StudentDetentionTransactionController/getclassskillcount?grade_code=" +
                   grade_new +
                   "&section_code=" +
                   section_new +
                   "&user_name=" +
                 loginuser
               )
               .then(function (res1) {
                    
                 $scope.classskillcount = res1.data;
                });
                    
                  
                }
              });
              
            };
            $scope.removepointsfullclass= function (cur_code_new,acad_year_new,grade_new,section_new,sims_skill_skin_code,sims_skill_name,sims_skill_code,sims_skill_point,sims_skill_typecode){
               
              $scope.sims_skill_skin_code_1 = sims_skill_skin_code;
              $scope.sims_skill_name_1 = sims_skill_name;
              $scope.sims_skill_point_1 = sims_skill_point;
              $scope.class_name_grade = grade_new ;
              $scope.class_name_section = section_new;
               $('.modal-backdrop').remove();
            
               $scope.savedata = [];
             
               var datasend = {
                  
           
           sims_mojo_academic_year :acad_year_new,
           sims_mojo_grade_code :grade_new,
           sims_mojo_section_code : section_new,
           sims_mojo_skill_code :sims_skill_code,
           sims_mojo_type_code :sims_skill_typecode,
           sims_mojo_transaction_created_user_code :$scope.emp_search,
         
                 };
                 $scope.savedata.push(datasend);
             
       
     
           $http
             .post(
               ENV.apiUrl +
                 "api/StudentDetentionTransactionController/removeDetentionmojoall",
               $scope.savedata
             )
               .then(function (msg) {
                    
                   $scope.msg1 = msg.data;
                
                   if ($scope.msg1 == true) {
                       $scope.savedata = [];
                      
                         $scope.removeall = false;
                         
                     $timeout(function() {
                       $scope.removeall = true; // Hide the modal after 5 seconds
                   }, 2000);
               
                   $http
                 .get(
                   ENV.apiUrl + "api/StudentDetentionTransactionController/getTotalSkillcount?user_name=" +
                   loginuser
                 )
                 .then(function (res) {
                   $scope.Total_count = res.data;
     
                 });
                 $http
                 .get(
                   ENV.apiUrl +
                     "api/StudentDetentionTransactionController/getclasstypecount?grade_code=" +
                     grade_new +
                     "&section_code=" +
                     section_new +
                     "&user_name=" +
                     loginuser
                 )
                 .then(function (res1) {
                         
                   $scope.classtypecount = res1.data;
                  });
                  $http
                  .get(
                    ENV.apiUrl +
                      "api/StudentDetentionTransactionController/getclassskillcount?grade_code=" +
                      grade_new +
                      "&section_code=" +
                      section_new +
                      "&user_name=" +
                    loginuser
                  )
                  .then(function (res1) {
                       
                    $scope.classskillcount = res1.data;
                   });
                       
                     
                   }
                 });
                 
               };
          $scope.closemodal2 = function (enroll_no) {
               
          
             
              $http
              .get(
                ENV.apiUrl + "api/StudentDetentionTransactionController/getSkillcount?enroll_number=" +
                enroll_no +
                "&user_name=" +
                loginuser
              )
              .then(function (res) {
                $scope.skillcount = res.data;
                $('.modal-backdrop').remove();
                $http
              .get(
                ENV.apiUrl + "api/StudentDetentionTransactionController/getTotalSkillcount?user_name=" +
                loginuser
              )
              .then(function (res) {
                $scope.Total_count = res.data;
  
              });
              
              });
              
          }
          $scope.closemodal = function () {
               
              $scope.markobtained =true;
              $scope.popup =true;
              $("#myModal4").modal("hide");
              $http
              .get(
                ENV.apiUrl + "api/StudentDetentionTransactionController/getTotalSkillcount?user_name=" +
                loginuser
              )
              .then(function (res) {
                $scope.Total_count = res.data;


                
  
              });
          }

          $scope.close2 =function(){
             
            $http
       .get(
         ENV.apiUrl + "api/StudentDetentionTransactionController/getstudentskinnew2?cur_code=" +
         $scope.sims_Cur +
         "&acad_year=" +
         $scope.sims_academic_year +
         "&grade_code=" +
         sims_grade_code +
         "&section_code=" +
         sims_section_code  +
         "&user_name=" +
         loginuser 
 
     
       )
       .then(function (res1) {
          
         $scope.studentskintest1= res1.data;
 
         $scope.imageUrl1 =
         "https://assets.mograsys.com/Images/mojo/skills/";
       });
 
          }

      
    

      $scope.getAllGrades = function () {
         
        $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getAllGrades?cur_code=" +
              $scope.sims_Cur +
              "&academic_year=" +
              $scope.sims_academic_year +
              "&user_name=" +
              loginuser
          )
          .then(function (res1) {
            $scope.grade_data = res1.data;
            setTimeout(function () {
              $("#grade_box")
                .change(function () {})
                .multipleSelect({
                  width: "100%",
                });
            }, 1000);
          });
      };

      $(function () {
        $("#grade_box").multipleSelect({ width: "100%" });
      });

      $scope.getSectionFromGrade = function (
        cur_code1,
        grade_code1,
        academic_year1
      ) {
         
        $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getSectionFromGrade?cur_code=" +
              $scope.sims_Cur +
              "&grade_code=" +
              $scope.sims_grade_code +
              "&academic_year=" +
              $scope.sims_academic_year +
              "&user_name=" +
              loginuser
          )
          .then(function (res1) {
            $scope.section_data = res1.data;
            
            setTimeout(function () {
              $("#section_box")
                .change(function () {})
                .multipleSelect({
                  width: "100%",
                });
              
            }, 1000);
          });
      };

      $(function () {
        $("#section_box").multipleSelect({ width: "100%" });
      });

      $timeout(function () {
        $("#customers").tableHeadFixer({ top: 1 });
      }, 100);

      $scope.getStudentList = function (sims_Cur,sims_academic_year,sims_grade_code,sims_section_code) {
       
          $scope.sims_grade_code_1 =sims_grade_code;
          $scope.sims_section_code_1 =sims_section_code;
        
       $http
         .get(
           ENV.apiUrl +
             "api/StudentDetentionTransactionController/getStudentList2?cur_code=" +
             $scope.sims_Cur +
             "&acad_year=" +
             $scope.sims_academic_year +
             "&grade_code=" +
             sims_grade_code +
             "&section_code=" +
             sims_section_code
         )
         .then(function (res1) {
                
           $scope.StudentList = res1.data;
           $scope.imageUrl =
           ENV.docUrl +
           $http.defaults.headers.common["schoolId"] +
           "/Images/StudentImages/";
           $scope.one=true;
           $scope.twoN=false;
         });

         var s={
             opr:"T",
             sims_cur_code:$scope.sims_Cur,
             sims_academic_year:$scope.sims_academic_year,
             sims_grade_code:sims_grade_code,
             sims_section_code:sims_section_code

         }
         $http
         .post(
           ENV.apiUrl + "api/StudentDetentionTransactionController/getTotalCountOfStudents",s
         )
         .then(function (res) {
           
           $scope.TotalcountN = res.data;
          
         }); 

         $http
         .get(
           ENV.apiUrl + "api/StudentDetentionTransactionController/getTotalSkillcount?user_name=" +
           loginuser
         )
         .then(function (res) {
           
           $scope.Total_count = res.data;

         });
         $http
         .get(
           ENV.apiUrl +
             "api/StudentDetentionTransactionController/getclasstypecount?grade_code=" +
             sims_grade_code +
             "&section_code=" +
             sims_section_code  +
             "&user_name=" +
             loginuser
         )
         .then(function (res1) {
                 
           $scope.classtypecount = res1.data;
          });
          $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getclassskillcount?grade_code=" +
              sims_grade_code +
              "&section_code=" +
              sims_section_code +
              "&user_name=" +
            loginuser
          )
          .then(function (res1) {
                
            $scope.classskillcount = res1.data;
           });

           //sheetal
            
           $http
      .get(
        ENV.apiUrl + "api/StudentDetentionTransactionController/getstudentskinnew2?cur_code=" +
        $scope.sims_Cur +
        "&acad_year=" +
        $scope.sims_academic_year +
        "&grade_code=" +
        sims_grade_code +
        "&section_code=" +
        sims_section_code  +
        "&user_name=" +
        loginuser 

    
      )
      .then(function (res1) {
         
        $scope.studentskintest1= res1.data;

        $scope.imageUrl1 =
        "https://assets.mograsys.com/Images/mojo/skills/";
      });

     };

       $scope.getClassN = function(sims_academic_year) {
      var temp0 = [];
   
      $scope.temp0=temp0;
      $http
        .get(
          ENV.apiUrl +
            "api/StudentDetentionTransactionController/getAllGrades?cur_code=" +
            $scope.sims_Cur +
            "&academic_year=" +
            sims_academic_year +
            "&user_name=" +
            loginuser
        )
        .then(function(res1) {
          $scope.grade_data = res1.data;
          for (var i = 0; i < $scope.grade_data.length; i++) {
            $scope.sims_grade_code = $scope.grade_data[i].sims_grade_code;
            (function(index) {
              $http
                .get(
                  ENV.apiUrl +
                    "api/StudentDetentionTransactionController/getSectionFromGradeN?cur_code=" +
                    $scope.sims_Cur +
                    "&grade_code=" +
                    $scope.sims_grade_code +
                    "&academic_year=" +
                    $scope.sims_academic_year +
                    "&user_name=" +
                    loginuser
                )
                .then(function(res1) {
                  temp0[index] = res1.data;
            

                  $scope.imageUrl1 =
                  "https://assets.mograsys.com/Images/mojo/skills/";
                  
                });
            })(i);
           
      
        
          }
          })
    };

      
      
      $scope.get_image = function () {
          $scope.image = false;
         };
         $scope.download = function (str) {
            
           window.open(
             "https://assets.mograsys.com/Content/"+
               $http.defaults.headers.common["schoolId"] +
               "/Images/StudentImages/" +
               str,
             "_new"
           );
         };
           $scope.closN=function(){
       
      $scope.twoN=true;
      $scope.one=false;
     }

      $scope.checklick = function () {
        $scope.datasend = [];

        for (var i = 0; i < $scope.StudentList.length; i++) {
          var t = $scope.StudentList[i].enroll_no;
          var v = document.getElementById(t + i);
          if (v.checked == true) {
            $scope.datasend.push($scope.StudentList[i]);
          }
        }
       
        if ($scope.global_stud_arr_after_emp.length > 0) {
          for (var j = 0; j <= $scope.global_stud_arr_after_emp.length; j++) {
       
            $scope.data = {
              student_name: $scope.global_stud_arr_after_emp[j].student_name,
              enroll_no: $scope.global_stud_arr_after_emp[j].enroll_no,
              sims_grade_code:
                $scope.global_stud_arr_after_emp[j].sims_grade_code,
              sims_section_code:
                $scope.global_stud_arr_after_emp[j].sims_section_code,
              sims_academic_year:
                $scope.global_stud_arr_after_emp[j].sims_academic_year,
              sims_cur_code: $scope.global_stud_arr_after_emp[j].sims_cur_code,
            };
            $scope.datasend.push($scope.data);
         
          }
        }
      };

      $scope.global_student1 = function () {
        
      };

      $scope.RemoveEnrollMentNo = function ($event, index, str) {
        str.splice(index, 1);
      };

      $scope.global_student = function () {
         
        $rootScope.visible_stud = true;
        $rootScope.visible_parent = false;
        $rootScope.visible_search_parent = false;
        $rootScope.visible_teacher = false;
        $rootScope.visible_User = false;
        $rootScope.visible_Employee = false;
        $rootScope.chkMulti = true;
        $scope.searchglo();
        $scope.global_stud_arr = [];
      };

      $scope.$on("global_cancel", function () {
        $scope.global_stud_arr = $scope.SelectedUserLst;
      
        if ($scope.global_stud_arr.length > 0) {
          for (var j = 0; j < $scope.SelectedUserLst.length; j++) {
            if (
              $scope.SelectedUserLst[j].s_enroll_no != "" &&
              $scope.SelectedUserLst[j].s_enroll_no != undefined
            ) {
              $scope.data = {
                student_name: $scope.SelectedUserLst[j].name,
                enroll_no: $scope.SelectedUserLst[j].s_enroll_no,
                sims_grade_code: $scope.SelectedUserLst[j].grade_code,
                sims_section_code: $scope.SelectedUserLst[j].section_code,
                sims_academic_year:
                  $scope.SelectedUserLst[j].sims_academic_year,
                sims_cur_code: $scope.SelectedUserLst[j].s_cur_code,
              };
              $scope.datasend.push($scope.data);
              $scope.global_stud_arr_after_emp.push($scope.data);
            }
          }

        }
     
      });


      $scope.UploadFileModal = function () {
        $("#myModal").modal("show");
      };

      var formdata = new FormData();
      $scope.hideModal = function () {
         
        $scope.showFileName = true;

        $scope.filename1 = $scope.filename;
        if (
          $scope.filename1 == undefined ||
          $scope.filename1 == "" ||
          $scope.filename1 == null
        ) {
          $scope.showFileName = false;
        }

        $scope.edt.sims_detention_transaction_doc_path = $scope.filename1;
        $("#myModal").modal("hide");
      };

      $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
          formdata.append(key, value);
        });
      };

      var fortype = "";
      var files;
      $scope.file_changed = function (element) {
        var photofile = element.files[0];
        var fortype = photofile.type.split("/")[1];
        $scope.filename = photofile.name;
        $scope.str = $scope.filename;
        $scope.filename = $scope.str.replace(/[&\/\\#, +()$~%'":*?<>{}]/g, "_");

        $scope.edt.employeeDocument = $scope.filename;
        $.extend($scope.edt, $scope.edt);

        $scope.photo_filename = photofile.name;

        var len = 0;
        len = $scope.photo_filename.split(".");
        fortype = $scope.photo_filename.split(".")[len.length - 1];
        $scope.photo_filename = photofile.type;


        var type = element.files[0].name.split(".")[1];
        var filesData = element.files;
        if (filesData.length) {
          files = new FormData();
          for (var i = 0; i < filesData.length; i++) {
            var fileNamedata = filesData[i].name;
            var filenamExtension = fileNamedata.split(".");
            files.append(
              filesData[i].name,
              filesData[i],
              "Web\\" + filesData[i].name.replace(/\s/g, "")
            );
          }
        }

        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.$apply(function () {
          });
        };
        reader.readAsDataURL(photofile);

      
      };




      $scope.getEmp = function () {
   

        $rootScope.visible_stud = false;
        $rootScope.visible_parent = false;
        $rootScope.visible_search_parent = false;
        $rootScope.visible_teacher = false;
        $rootScope.visible_User = false;
        $rootScope.visible_Employee = true;
        $rootScope.chkMulti = false;

        $scope.searchglo();

        $scope.$on("global_cancel", function () {
          $scope.Empdata = [];
          if ($scope.SelectedUserLst.length > 0) {
            for (var k = 0; k < $scope.SelectedUserLst.length; k++) {
              $scope.data2 = {
                em_login_code: $scope.SelectedUserLst[k].em_login_code,
                empName: $scope.SelectedUserLst[k].empName,
              };
              $scope.Empdata.push($scope.data2);
            }
            if ($scope.Empdata.length > 0) {
              $scope.emp_search = $scope.Empdata[0].em_login_code;
            }
          }
        });
      };

      $scope.searchglo = function () {
        $scope.global_Search_click();
        $("#Global_Search_Modal").modal({ backdrop: "static" });
      };

      $scope.CheckAllChecked = function () {
        main = document.getElementById("mainchk");
        if (main.checked == true) {
          for (var i = 0; i < $scope.StudentList.length; i++) {
            var v = document.getElementById(
              $scope.StudentList[i].enroll_no + i
            );
            v.checked = true;
            $scope.datasend.push($scope.StudentList[i]);
            $scope.row1 = "row_selected";
            $("tr").addClass("row_selected");
          }
        } else {
          for (var i = 0; i < $scope.StudentList.length; i++) {
            var v = document.getElementById(
              $scope.StudentList[i].enroll_no + i
            );
            v.checked = false;
            main.checked = false;
            $scope.datasend = [];
            $scope.row1 = "";
          }
          if ($scope.SelectedUserLst.length > 0) {
            for (var j = 0; j <= $scope.SelectedUserLst.length; j++) {
              $scope.data = {
                student_name: $scope.SelectedUserLst[j].name,
                enroll_no: $scope.SelectedUserLst[j].s_enroll_no,
                sims_grade_code: $scope.SelectedUserLst[j].grade_code,
                sims_section_code: $scope.SelectedUserLst[j].section_code,
                sims_academic_year:
                  $scope.SelectedUserLst[j].sims_academic_year,
                sims_cur_code: $scope.SelectedUserLst[j].s_cur_code,
              };
              $scope.datasend.push($scope.data);
            }
          }
        }
      };
    
      $http
        .get(
          ENV.apiUrl +
            "api/StudentDetentionTransactionController/getLevelCodeNew?user=" +
            $scope.created_user
        )
        .then(function (res1) {
           
          $scope.level_data = res1.data;
          $scope.sims_detention_level_code =$scope.level_data[0].sims_detention_level_code;
          setTimeout(function () {
            $("#level_box")
              .change(function () {})
              .multipleSelect({
                width: "100%",
              });
          }, 1000);
        });

      $scope.Load_levels = function () {
        $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getLevelCode"
          )
          .then(function (res1) {
            $scope.level_data = res1.data;
            $scope.sims_detention_level_code =
              $scope.level_data[0].sims_detention_level_code;
            setTimeout(function () {
              $("#level_box")
                .change(function () {})
                .multipleSelect({
                  width: "100%",
                });
            }, 1000);
          });
      };

      $scope.Load_levels_new = function () {
        $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getLevelCodeNew?user=" +
              $scope.created_user
          )
          .then(function (res1) {
            $scope.level_data = res1.data;
            $scope.sims_detention_level_code =
              $scope.level_data[0].sims_detention_level_code;
            setTimeout(function () {
              $("#level_box")
                .change(function () {})
                .multipleSelect({
                  width: "100%",
                });
            }, 1000);
          });
      };

      $http
        .get(ENV.apiUrl + "api/StudentDetentionTransactionController/getStatus")
        .then(function (res1) {
          $scope.status_data = res1.data;
          $scope.sims_appl_parameter =
            $scope.status_data[0].sims_appl_parameter;
        });

      $(function () {
        $("#level_box").multipleSelect({ width: "100%" });
      });

      $scope.getLevelDesc = function (sims_detention_level_code) {
        $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getLevelDesc?sims_detention_level_code=" +
              sims_detention_level_code
          )
          .then(function (res1) {
            $scope.level_desc_data = res1.data;
          });
      };

      $scope.checklick_det_level = function (obj, index) {
        var v = document.getElementById(obj.sims_detention_desc_code + index);
        if (v.checked == true) {
          obj.isChecked = true;
        } else {
          obj.isChecked = false;
        }
      };

  
      $scope.InsertIntoDetensionTransaction = function () {
         

        if ($scope.student_remark == undefined || $scope.student_remark == "") {
          swal({
            title: "Alert",
            text: "Please insert remark",
            imageUrl: "assets/img/check.png",
            width: 300,
            height: 200,
          });
        } else {
          $scope.savedata = [];
          $scope.busyindicator = false;
          $(document).ready(function () {
            $("#MyModal4").fadeIn("slow");
          });

          for (var i = 0; i < $scope.level_desc_data.length; i++) {
            for (var j = 0; j < $scope.datasend.length; j++) {
              if ($scope.level_desc_data[i].isChecked == true) {
                var datasend = {
                  sims_cur_code: $scope.datasend[j].sims_cur_code,
                  sims_academic_year: $scope.datasend[j].sims_academic_year,
                  sims_grade_code: $scope.datasend[j].sims_grade_code,
                  sims_section_code: $scope.datasend[j].sims_section_code,
                  enroll_no: $scope.datasend[j].enroll_no,
                  sims_detention_level_code:
                    $scope.level_desc_data[i].sims_detention_level_code,
                  sims_detention_desc_code:
                    $scope.level_desc_data[i].sims_detention_desc_code,
                  sims_detention_description:
                    $scope.level_desc_data[i].sims_detention_description,
                  sims_detention_point:
                    $scope.level_desc_data[i].sims_detention_point,
                  sims_detention_remark: $scope.student_remark,
                  sims_detention_transaction_notified_user_code:
                    $scope.emp_search,
                  sims_detention_transaction_status: $scope.sims_appl_parameter,
                  sims_detention_transaction_created_user_code:$scope.created_user,
                  sims_detention_transaction_updated_user_code: $scope.created_user,
                  sims_detention_transaction_doc_path: $scope.filename1
                };
                $scope.savedata.push(datasend);
              }
            }
          }

         

          $http
            .post(
              ENV.apiUrl +
                "api/StudentDetentionTransactionController/InsertDetention",
              $scope.savedata
            )
            .then(function (msg) {
              $scope.msg1 = msg.data;
             

              if ($scope.msg1 == true) {
                $(document).ready(function () {
                  $("#MyModal4").fadeOut("fast");
                  $scope.datasend = [];
               
                  $scope.global_stud_arr = [];
                  $scope.savedata = [];
                  $scope.StudentList = [];
                  main = document.getElementById("mainchk");
                  main.checked = false;
                  $scope.student_remark = "";
                  $scope.sims_detention_transaction_doc_path = "";
                  $scope.level_desc_data = [];
                  $scope.Load_levels_new();
                });
                swal({
                  title: "Alert",
                  text: "Records Inserted successfully",
                  imageUrl: "assets/img/check.png",
                  width: 300,
                  height: 200,
                });
                $scope.busyindicator = true;
              } else {
                swal({
                  title: "Alert",
                  text: "Record Not Inserted. ",
                  imageUrl: "assets/img/close.png",
                  width: 300,
                  height: 200,
                });
                $("#MyModal4").fadeOut("fast");
                $scope.busyindicator = true;
              }
            });
        }
      };
      $scope.ViewHistory = function (str) {
         
        $scope.studenthistory = [];
        $scope.studentname = "";
        $scope.studentgrade = "";
        $scope.studentsection = "";
        $scope.studentacademic_year = "";
        $("#MyModal5").modal("show");
        $http
          .get(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/getStudentHistoy?sims_cur_code=" +
              str.sims_cur_code +
              "&sims_academic_year=" +
              str.sims_academic_year +
              "&sims_grade_code=" +
              str.sims_grade_code +
              "&sims_section_code=" +
              str.sims_section_code +
              "&sims_enroll_number=" +
              str.enroll_no
          )
          .then(function (res1) {
            $scope.studenthistory = res1.data;
            $scope.studentname =
              $scope.studenthistory[0].enroll_no +
              " - " +
              $scope.studenthistory[0].student_name;
            $scope.studentgrade = $scope.studenthistory[0].sims_grade_name_en;
            $scope.studentsection =
              $scope.studenthistory[0].sims_section_name_en;
            $scope.studentacademic_year =
              $scope.studenthistory[0].sims_academic_year;
            $scope.sims_academic_year_description =
              $scope.studenthistory[0].sims_academic_year_description;
            $scope.enroll_no = $scope.studenthistory[0].enroll_no;
          });
      };

      $scope.Deletetranaction = function (str) {
         
        var data = [];
        var datasend = [];
        $scope.data = {
          sims_cur_code: str.sims_cur_code,
          sims_academic_year: str.sims_academic_year,
          sims_grade_code: str.sims_grade_code,
          sims_section_code: str.sims_section_code,
          enroll_no: str.enroll_no,
          sims_detention_level_code: str.sims_detention_level_code,
          sims_detention_desc_code: str.sims_detention_desc_code,
        };

        datasend.push($scope.data);
  

        $http
          .post(
            ENV.apiUrl +
              "api/StudentDetentionTransactionController/CUDDeletetranaction",
            datasend
          )
          .then(function (msg) {
            $scope.msg1 = msg.data;
           

            if ($scope.msg1 == true) {
              swal({
                title: "Alert",
                text: "Records Deleted successfully",
                imageUrl: "assets/img/check.png",
                width: 300,
                height: 200,
              });
              $scope.ViewHistory(str);
              $scope.busyindicator = true;
            } else {
              $scope.ViewHistory(str);
              swal({
                title: "Alert",
                text: "Record Not Deleted. ",
                imageUrl: "assets/img/close.png",
                width: 300,
                height: 200,
              });
            }
          });
      };
    },
  ]);
})();  
