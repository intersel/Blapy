<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

	<base href="<?php echo dirname("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI])").'/' ?>">

    <title>SB Admin 2 - Bootstrap Admin Theme Using Blapy :-)</title>

    <!-- Bootstrap Core CSS -->
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="../dist/css/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="../bower_components/morrisjs/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id='myBlapy'>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.php">SB Admin v2.0 using Blapy !</a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-envelope fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                     <ul class="dropdown-menu dropdown-messages" >
                      <li>
                            <a class="text-center" href="#">
                                <strong>Read All Messages</strong>
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                     </ul>
                    <ul
											id="messagesList"
											class="dropdown-menu dropdown-messages" style="margin-top: 42px;"
                    	data-blapy-container="true"
						data-blapy-container-name="messagesList"
						data-blapy-container-content="messagesListInit"
						data-blapy-update="json"
            data-blapy-template-init-purejson="0"
					>
                        <li>
                            <a href="#">
                                <div>
                                    <strong>${firstname} ${lastname}</strong>
                                    <span class="pull-right text-muted">
                                        <em>${date}</em>
                                    </span>
                                </div>
                                <div>${message}</div>
                            </a>
                        </li>
                        <li class="divider"></li>
                     </ul>
                    <!-- /.dropdown-messages -->
                </li>
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-tasks fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-tasks">
						<li>
                            <a class="text-center" href="#">
                                <strong>See All Tasks</strong>
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                    <ul
											id="tasksList"
											class="dropdown-menu dropdown-tasks" style="margin-top: 42px;"
	                   	data-blapy-container="true"
						data-blapy-container-name="tasksList"
						data-blapy-container-content="tasksListInit"
						data-blapy-update="json"
            data-blapy-template-init-purejson="0"
                    >
                        <li>
                            <a href="#">
                                <div>
                                    <p>
                                        <strong>${taskId}</strong>
                                        <span class="pull-right text-muted">${completeness}% Complete</span>
                                    </p>
                                    <div class="progress progress-striped active">
                                        <div 	class="progress-bar progress-bar-${statusTask}"
                                        		role="progressbar"
                                        		aria-valuenow="${completeness}"
                                        		aria-valuemin="0"
                                        		aria-valuemax="100"
                                        		style="width: ${completeness}%">
                                            <span class="sr-only">${completeness}% Complete (${statusTask})</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                    </ul>
                    <!-- /.dropdown-tasks -->
                </li>
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-bell fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-alerts">
                    	<li>
                            <a class="text-center" href="#">
                                <strong>See All Alerts</strong>
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                    <ul
											id="alertsList"
											class="dropdown-menu dropdown-alerts"  style="margin-top: 42px;"
	                   	data-blapy-container="true"
						data-blapy-container-name="alertsList"
						data-blapy-container-content="alertsListInit"
						data-blapy-update="json"
            data-blapy-template-init-purejson="0"
					>
                        <li>
                            <a href="#">
                                <div>
                                    <i class="fa fa-${alertType} fa-fw"></i> ${alertTitle}
                                    <span class="pull-right text-muted small">${alertElapsedTime}</span>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                    </ul>
                    <!-- /.dropdown-alerts -->
                </li>
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul
											id="userFeaturesList"
											class="dropdown-menu dropdown-user"
                    	data-blapy-container="true"
						data-blapy-container-name="userFeaturesList"
						data-blapy-container-content="userFeaturesListInit"
                    	data-blapy-update="json"
                      data-blapy-template-init-purejson="0"
                    >
                        <li class="${class}">
                        	<a href="${url}"><i class="fa fa-${featureIcon} fa-fw"></i> ${feature}</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu"
                                data-blapy-container="true"
								data-blapy-container-name="sideMenusList"
								data-blapy-container-content="sideMenusListInit"
								data-blapy-update="json"
                data-blapy-template-init-purejson="0"
								>
                                <li ${liInfo}>
                                    ${subMenuContent}
                                </li>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-comments fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div
																		id="nbNewComments"
																		class="huge"
																		data-blapy-container="true"
																		data-blapy-container-name="nbNewComments"
																		data-blapy-container-content="nbNewCommentsVoid"
                                    	></div>
                                    <div>New Comments!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div
																			id="nbNewTasks"
																			class="huge"
                                    	data-blapy-container="true"
																			data-blapy-container-name="nbNewTasks"
																			data-blapy-container-content="nbNewTasksVoid"
                                    	></div>
                                    <div>New Tasks!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-shopping-cart fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div id="nbNewOrders"
                                    class="huge"
                                    data-blapy-container="true"
                                    data-blapy-container-name="nbNewOrders"
                                    data-blapy-container-content="nbNewOrdersVoid"
                                    ></div>
                                    <div>New Orders!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-support fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div id="nbNewTickets"
																			class="huge"
                                    	data-blapy-container="true"
										data-blapy-container-name="nbNewTickets"
										data-blapy-container-content="nbNewTicketsVoid"></div>
                                    <div>Support Tickets!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-8">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Area Chart Example
                            <div class="pull-right">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        Actions
                                        <span class="caret"></span>
                                    </button>
                                    <ul
																		id="areaChart"
																		class="dropdown-menu pull-right" role="menu"
                                    data-blapy-container="true"
																		data-blapy-container-name="areaChart"
																		data-blapy-container-content="areaChartVoid"
																		data-blapy-update="json"
                                    data-blapy-template-init-purejson="0"
                                    >
                                    	<li class="${class}"><a href="${url}">${action}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div id="morris-area-chart"></div>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Bar Chart Example
                            <div class="pull-right">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        Actions
                                        <span class="caret"></span>
                                    </button>
                                    <ul id="barChartExampleMenu"
                                    	class="dropdown-menu pull-right" role="menu"
                                       	data-blapy-container="true"
										data-blapy-container-name="barChartExampleMenu"
										data-blapy-container-content="barChartExampleMenuVoid"
										data-blapy-update="json"
                    data-blapy-template-init-purejson="0"
                                    >
                                     <blapyScriptJS>
	                                    	if (!"${dontdisplay}")
    	                                    	jQuery('#barChartExampleMenu').append('<li class="${class}"><a href="${url}">${action}</a></li>');
                                     </blapyScriptJS>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody
																							id="barChartExample"
                                            	data-blapy-container="true"
												data-blapy-container-name="barChartExample"
												data-blapy-container-content="barChartExampleVoid"
												data-blapy-updateblock-ondisplay="true"
												data-blapy-href="phpAPI/updateBarChartExample.php"
											>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- /.table-responsive -->
                                </div>
                                <!-- /.col-lg-4 (nested) -->
                                <div class="col-lg-8">
                                    <div id="morris-bar-chart"></div>
                                </div>
                                <!-- /.col-lg-8 (nested) -->
                            </div>
                            <!-- /.row -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-clock-o fa-fw"></i> Responsive Timeline
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <ul class="timeline"
															id="timeLine"
                            	data-blapy-container="true"
								data-blapy-container-name="timeLine"
								data-blapy-container-content="timeLineVoid"
								data-blapy-template-init="phpAPI/timeLineInit.php"
								data-blapy-update="json"
                data-blapy-template-init-purejson="0"
								>
                                <li  class="timeline-${timeblockPlace}">
                                    <div class="timeline-${timelineClass}"><i class="fa fa-${timelineType}"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">${timelineTitle}</h4>
                                            <p><small class="text-muted"><i class="fa fa-${textMutedClass}"></i> ${textMuted}</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            ${timeBody}
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-8 -->
                <div class="col-lg-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bell fa-fw"></i> Notifications Panel
                        </div>
                        <!-- /.panel-heading -->
                        <div
														class="panel-body">
                            <div
														id="NotificationsPanelVoid"
														class="list-group"
                            data-blapy-container="true"
														data-blapy-container-name="NotificationsPanel"
														data-blapy-container-content="NotificationsPanelVoid"
														data-blapy-template-init="phpAPI/NotificationsPanelInit.json"
														data-blapy-update="json"
                            data-blapy-template-init-purejson="0"
                            >
                                <a href="${URL}" class="list-group-item">
                                    <i class="fa fa-fw ${class}"></i> ${TextNotification}
                                    <span class="pull-right text-muted small"><em>${TimeNotification}</em>
                                    </span>
                                </a>
                            </div>
                            <!-- /.list-group -->
                            <a href="#" class="btn btn-default btn-block">View All Alerts</a>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Donut Chart Example
                        </div>
                        <div class="panel-body">
                            <div id="morris-donut-chart"></div>
                            <a href="#" class="btn btn-default btn-block">View Details</a>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                    <div class="chat-panel panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-comments fa-fw"></i>
                            Chat
                            <div class="btn-group pull-right">
                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-chevron-down"></i>
                                </button>
                                <ul class="dropdown-menu slidedown"
																id="chatButton"
                            	data-blapy-container="true"
								data-blapy-container-name="chatButton"
								data-blapy-container-content="chatButtonVoid"
								data-blapy-template-init="phpAPI/chatButtonInit.json"
								data-blapy-update="json"
                data-blapy-template-init-purejson="0"
                                >
                                    <li class="${classLI}">
                                        <a href="${URL}">
                                            <i class="fa ${class} fa-fw"></i> ${textChat}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <ul class="chat"
															id="chatTextList"
                            	data-blapy-container="true"
								data-blapy-container-name="chatTextList"
								data-blapy-container-content="chatTextListVoid"
								data-blapy-template-init="phpAPI/chatTextListInit.json"
								data-blapy-update="json"
                data-blapy-template-init-purejson="0"
                            >
                            <xmp>
                                <li class="left clearfix">
                                    <span class="chat-img pull-${leftright}">
                                        <img src="${avatarIMG}" alt="User Avatar" class="img-circle" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">${nameUser}</strong>
                                            <small class="pull-right text-muted">
                                                <i class="fa fa-clock-o fa-fw"></i>${time}
                                            </small>
                                        </div>
                                        <p>
                                            ${textChat}
                                        </p>
                                    </div>
                                </li>
                              </xmp>
                            </ul>
                        </div>
                        <!-- /.panel-body -->
                        <div class="panel-footer">
                            <div class="input-group">
                                <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                                <span class="input-group-btn">
                                    <button class="btn btn-warning btn-sm" id="btn-chat">
                                        Send
                                    </button>
                                </span>
                            </div>
                        </div>
                        <!-- /.panel-footer -->
                    </div>
                    <!-- /.panel .chat-panel -->
                </div>
                <!-- /.col-lg-4 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="../bower_components/raphael/raphael-min.js"></script>
    <script src="../bower_components/morrisjs/morris.min.js"></script>
    <script src="../js/morris-data.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>


<!--  Blapy call -->
		<script type="text/javascript" src="../../../extlib/sammy/lib/sammy.js"></script>
		<script type="text/javascript" src="../../../extlib/iFSM/extlib/jquery.dotimeout.js"></script>
		<script type="text/javascript" src="../../../extlib/iFSM/extlib/jquery.attrchange.js"></script>
		<script type="text/javascript" src="../../../extlib/iFSM/iFSM.js"></script>
		<script type="text/javascript" src="../../../extlib/json2html/json2html.js"></script>
		<script type="text/javascript" src="../../../extlib/jquery.appear/jquery.appear.js"></script>
		<script type="text/javascript" src="../../../extlib/json5/index.min.js"></script>
		<script type="text/javascript" src="../../../Blapy.js"></script>
		<script>
			$( document ).ready(function() {

				//start Blapy
				$('#myBlapy').Blapy({activeSammy:true,debug:true,LogLevel:1});
				//init blocks
				$('#myBlapy').trigger('postData',{aUrl:'phpAPI/initActions.php'});

				//catch errors
				$( "#myBlapy" ).on( "Blapy_ErrorOnPageChange", function(event,anError) {
					  alert( 'Blapy error: '+anError );
					});

			    $(document).on( "Blapy_afterContentChange","#side-menu", function(event,aBlock) {
			    	 $('#side-menu').metisMenu();//update behaviour on the left menu bar
		            });

			});

		</script>



</body>

</html>
