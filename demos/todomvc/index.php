<!doctype html>
<html lang="en" data-framework="javascript">
	<head>
		<meta charset="utf-8">
		<base href="<?php echo dirname("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI])").'/' ?>">
		<title>Blapy • TodoMVC</title>
		<link rel="stylesheet" href="node_modules/todomvc-common/base.css">
		<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
	</head>
	<body>
		<section class="todoapp" id="myBlapy">
			<header class="header">
				<h1>todos</h1>
				<input class="new-todo" placeholder="What needs to be done?" autofocus
						 onkeypress="if (event.keyCode==13) { $('#myBlapy').trigger('postData',{aUrl:'php/addAction.php',params:{actionName:$(this).val()}}); $(this).val('')}">
			</header>
			<section class="main">
				<input id="selectAllToggle"
						class="toggle-all"
						type="checkbox"
						data-blapy-container="true"
						data-blapy-container-name="selectAllToggle"
						data-blapy-container-content="selectAllToggle-Off"
						onclick="$('#myBlapy').trigger('postData',{aUrl:'php/allCompleted.php',params:{toggleStatus:$(this).prop('checked')}})">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list" id="todo-list"
					data-blapy-container="true"
					data-blapy-container-name="todo-list"
					data-blapy-container-content="todo-list-void"></ul>
			</section>
			<footer class="footer">
				<span class="todo-count"><strong><span 	id="numberOfItems"
												data-blapy-container="true"
												data-blapy-container-name="numberOfItems"
												data-blapy-container-content="numberOfItems-void">0</span></strong> items left</span>
				<ul id="filters-All"
						class="filters"
						data-blapy-container="true"
						data-blapy-container-name="filters"
						data-blapy-container-content="filters-All"
					>
					<li>
						<a href="php/getAll.php" data-blapy-link="true" class="selected">All</a>
					</li>
					<li>
						<a href="php/getActive.php" data-blapy-link="true">Active</a>
					</li>
					<li>
						<a href="php/getCompleted.php" data-blapy-link="true">Completed</a>
					</li>
				</ul>
				<button id="showClear"
						class="clear-completed"
						data-blapy-container="true"
						data-blapy-container-name="showClear"
						data-blapy-container-content="showClear-False"
						style="display:none"
						>Clear completed</button>

			</footer>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<p>Reload the whole page (with F5) will reset the todo list completly</p>
			<p>Created by <a href="https://github.com/intersel">Emmanuel Podvin</a></p>
			<p>Still not part of... <a href="http://todomvc.com">TodoMVC</a> but completly inspired from it!</p>
		</footer>


		<script type="text/javascript" src="../../extlib/jquery-3.4.1.min.js"></script>
		<script type="text/javascript" src="../../extlib/sammy/lib/sammy.js"></script>
		<script type="text/javascript" src="../../extlib/iFSM/extlib/jquery.dotimeout.js"></script>
		<script type="text/javascript" src="../../extlib/iFSM/extlib/jquery.attrchange.js"></script>
		<script type="text/javascript" src="../../extlib/iFSM/iFSM.js"></script>
		<script type="text/javascript" src="../../extlib/json2html/json2html.js"></script>
		<script type="text/javascript" src="../../Blapy.js"></script>
		<script>
			$( document ).ready(function() {

				//start Blapy
				$('#myBlapy').Blapy({activeSammy:true});
				//init blocks
				$('#myBlapy').trigger('postData',{aUrl:'php/resetActions.php'});

				//catch errors
				$( "#myBlapy" ).on( "Blapy_ErrorOnPageChange", function(event,anError) {
					  alert( 'Blapy error: '+anError );
					});

				var oriVal;
				 $(document).on('dblclick', '#todo-list label', function () {
				    oriVal = $(this).text();
				    $(this).text("");
				    $("<input type='text' style='font-size:22px'>").appendTo(this).val(oriVal).focus();
				});
				 $(document).on('keypress', '#todo-list label > input', function (event) {
					 if ( event.which == 13 ) {
					     event.preventDefault();
					     $(this).trigger('focusout');
					  }
				 });

				 $(document).on('focusout', '#todo-list label > input', function () {
				    var $this = $(this);
				    var newText = $this.val() || oriVal;
				    var actionId = $this.parent().attr('data-id');
				    $this.parent().text(newText);
				    $('#myBlapy').trigger('postData',{aUrl:'php/editAction.php',params:{actionName:newText,actionId:actionId}});
				    $this.remove(); // Don't just hide, remove the element.
				});

			});

		</script>

	</body>
</html>
