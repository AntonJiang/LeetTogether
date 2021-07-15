document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('refreshToServer');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      
      const Http = new XMLHttpRequest();
      const url='https://leetcode.com/api/problems/algorithms/';
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
        d = document;

        var f = d.createElement('form');
        f.action = 'https://yz8vxbajt1.execute-api.us-east-1.amazonaws.com/default/leetTogether';
        f.method = 'post';
        
        data = JSON.parse(Http.responseText);
        var user_name = d.createElement('input');
        user_name.type = 'hidden';
        user_name.name = 'user_name';
        user_name.value = data.user_name;
        f.appendChild(user_name);
      
        var num_solved = d.createElement('input')
        num_solved.type = 'hidden';
        num_solved.name = 'num_solved';
        num_solved.value = data.num_solved;
        f.appendChild(num_solved);

        var num_total = d.createElement('input')
        num_total.type = 'hidden';
        num_total.name = 'num_total';
        num_total.value = data.num_total;
        f.appendChild(num_total);

        var prob_list = d.createElement('input')
        prob_list.type = 'hidden';
        prob_list.name = 'prob_list';

        var list = [];
        for (const prob of data.stat_status_pairs){
          const value = {difficulty_level:prob.difficulty.level,
           is_favor:prob.is_favor, 
           paid_only:prob.paid_only, 
           status:prob.status,
           frontend_question_id: prob.stat.frontend_question_id,
           question__title: prob.stat.question__title,
           question__title_slug: prob.stat.question__title_slug,
           question_id: prob.stat.question_id,
           total_acs: prob.stat.total_acs,
           total_submitted: prob.stat.total_submitted,
          };
          if (value.status != null){
            list.push(value);
          }
          
        }
        prob_list.value = JSON.stringify(list);
        f.appendChild(prob_list);

        d.body.appendChild(f);
        f.submit();
      }

      
    });
  }, false);
}, false);