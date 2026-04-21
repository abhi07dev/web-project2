angular.module('StreamVaultApp', [])
.controller('MainCtrl', function($scope, $timeout, $http) {

  // ---- STATE ----
  $scope.page = 'login';
  $scope.authTab = 'login';
  $scope.currentUser = null;
  $scope.modal = '';
  $scope.notifFilter = 'all';
  $scope.videoSearch = '';
  $scope.videoFilter = '';
  $scope.videoStatusFilter = '';
  $scope.subSearch = '';
  $scope.subPlanFilter = '';
  $scope.showLoginPwd = false;
  $scope.showRegPwd = false;
  $scope.uploading = false;
  $scope.uploadProgress = 0;
  $scope.uploadSuccess = false;
  $scope.uploadedTitle = '';
  $scope.modalUploadSuccess = false;
  $scope.subAddSuccess = false;
  $scope.registerSuccess = false;
  $scope.loginSuccess = false;
  $scope.loginSuccessName = '';

  $scope.login = {};
  $scope.loginErrors = {};
  $scope.loginValid = {};
  $scope.reg = { plan: 'free' };
  $scope.regErrors = {};
  $scope.upload = { emoji: '🎬', plan: 'free', comments: true, publishNow: true };
  $scope.uploadErrors = {};
  $scope.quick = { emoji: '🎬' };
  $scope.quickErr = {};
  $scope.newSub = { plan: 'free', status: 'active' };
  $scope.subErr = {};
  $scope.editV = {};
  $scope.editVRef = null;

  $scope.genres = ['Action','Comedy','Drama','Thriller','Horror','Romance','Sci-Fi','Documentary','Animation','Sports'];
  $scope.thumbnailOptions = ['🎬','🎭','🎮','🏆','🌍','🚀','👻','💥','🎵','🏋️','🎨','📚'];

  // ---- SEED DATA ----
  $scope.users = [
    { email: 'admin@streamvault.com', password: 'admin123', name: 'Admin' },
    { email: 'demo@streamvault.com', password: 'demo1234', name: 'Demo User' }
  ];

  $scope.videos = [
    { id:1, title:'The Last Horizon', genre:'Sci-Fi', duration:'2:18:00', views:142800, rating:4.7, status:'active', emoji:'🚀', watchTime:284, revenue:12400, year:2024 },
    { id:2, title:'Midnight Shadows', genre:'Thriller', duration:'1:54:30', views:98600, rating:4.5, status:'active', emoji:'👻', watchTime:197, revenue:8900, year:2023 },
    { id:3, title:'Champions Forever', genre:'Sports', duration:'1:42:15', views:76300, rating:4.8, status:'active', emoji:'🏆', watchTime:152, revenue:6700, year:2024 },
    { id:4, title:'Love in Bombay', genre:'Romance', duration:'2:05:45', views:55100, rating:4.2, status:'active', emoji:'💑', watchTime:110, revenue:4800, year:2023 },
    { id:5, title:'Code Red', genre:'Action', duration:'1:58:20', views:212400, rating:4.6, status:'active', emoji:'💥', watchTime:424, revenue:19200, year:2024 },
    { id:6, title:'Stand Up Special', genre:'Comedy', duration:'1:12:00', views:88700, rating:4.9, status:'pending', emoji:'🎭', watchTime:177, revenue:7800, year:2024 },
    { id:7, title:'Earth Untold', genre:'Documentary', duration:'1:35:50', views:44200, rating:4.4, status:'active', emoji:'🌍', watchTime:88, revenue:3900, year:2023 },
    { id:8, title:'Neon Samurai', genre:'Action', duration:'2:22:10', views:163000, rating:4.6, status:'inactive', emoji:'⚔️', watchTime:326, revenue:14700, year:2022 },
  ];

  $scope.subscribers = [
    { id:1, name:'Priya Sharma', email:'priya@gmail.com', mobile:'+91 9876543210', plan:'premium', status:'active', watchHours:284, joined:'Jan 2024', color:'#E5383B' },
    { id:2, name:'Rahul Mehta', email:'rahul@yahoo.com', mobile:'+91 8765432109', plan:'basic', status:'active', watchHours:142, joined:'Feb 2024', color:'#4D7EFF' },
    { id:3, name:'Anita Desai', email:'anita@outlook.com', mobile:'+91 7654321098', plan:'free', status:'active', watchHours:67, joined:'Mar 2024', color:'#00C9A7' },
    { id:4, name:'Kiran Patel', email:'kiran@proton.me', mobile:'+91 6543210987', plan:'premium', status:'active', watchHours:312, joined:'Dec 2023', color:'#FFB830' },
    { id:5, name:'Suresh Nair', email:'suresh@gmail.com', mobile:'+91 9988776655', plan:'basic', status:'pending', watchHours:89, joined:'Apr 2024', color:'#9B59B6' },
    { id:6, name:'Meera Joshi', email:'meera@gmail.com', mobile:'+91 8877665544', plan:'free', status:'inactive', watchHours:12, joined:'Apr 2024', color:'#1ABC9C' },
    { id:7, name:'Arjun Kapoor', email:'arjun@icloud.com', mobile:'+91 7766554433', plan:'premium', status:'active', watchHours:456, joined:'Nov 2023', color:'#E74C3C' },
    { id:8, name:'Deepika Singh', email:'deepika@gmail.com', mobile:'+91 6655443322', plan:'basic', status:'active', watchHours:178, joined:'Jan 2024', color:'#3498DB' },
  ];

  $scope.notifications = [
    { id:1, title:'New Premium Subscriber', body:'Arjun Kapoor just upgraded to Premium plan', category:'subscriber', time:'2m ago', read:false },
    { id:2, title:'Video Processing Complete', body:'"Code Red" has finished processing and is now live', category:'system', time:'15m ago', read:false },
    { id:3, title:'Revenue Milestone', body:'You have reached ₹50,000 in monthly revenue!', category:'system', time:'1h ago', read:false },
    { id:4, title:'New Comment', body:'Priya Sharma commented on "The Last Horizon"', category:'subscriber', time:'2h ago', read:true },
    { id:5, title:'Subscription Expiring', body:'Suresh Nair\'s plan expires in 3 days', category:'subscriber', time:'3h ago', read:true },
    { id:6, title:'High Traffic Alert', body:'"Champions Forever" is trending — 5,000 views in last hour', category:'system', time:'5h ago', read:true },
    { id:7, title:'New Subscriber', body:'Deepika Singh created a Basic account', category:'subscriber', time:'1d ago', read:true },
    { id:8, title:'Storage Warning', body:'You have used 75% of your allocated storage', category:'system', time:'2d ago', read:true },
  ];

  $scope.stats = {
    totalVideos: $scope.videos.length,
    subscribers: $scope.subscribers.length,
    totalViews: $scope.videos.reduce((a,v)=>a+v.views,0),
    revenue: 74500
  };

  $scope.analytics = {
    totalPlays: 921100,
    avgWatch: 48,
    retention: 68,
    avgRating: 4.6,
    daily: [
      {day:'Mon',views:12400},{day:'Tue',views:18700},{day:'Wed',views:15300},
      {day:'Thu',views:22100},{day:'Fri',views:31800},{day:'Sat',views:28500},{day:'Sun',views:19900}
    ],
    genreStats: [
      {name:'Action',pct:32,color:'var(--accent)'},
      {name:'Sci-Fi',pct:22,color:'var(--blue)'},
      {name:'Thriller',pct:18,color:'var(--amber)'},
      {name:'Comedy',pct:14,color:'var(--teal)'},
      {name:'Others',pct:14,color:'var(--muted)'},
    ]
  };

  $scope.maxDaily = Math.max(...$scope.analytics.daily.map(d=>d.views));

  // ---- NAVIGATION ----
  $scope.navigate = function(p) { $scope.page = p; };

  // ---- AUTH: LOGIN VALIDATION ----
  $scope.validateLoginEmail = function() {
    var e = $scope.login.email || '';
    if (!e) { $scope.loginErrors.email = 'Email is required'; $scope.loginValid.email = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { $scope.loginErrors.email = 'Enter a valid email address'; $scope.loginValid.email = false; }
    else { $scope.loginErrors.email = ''; $scope.loginValid.email = true; }
  };
  $scope.validateLoginPwd = function() {
    var p = $scope.login.password || '';
    if (!p) { $scope.loginErrors.password = 'Password is required'; $scope.loginValid.password = false; }
    else if (p.length < 6) { $scope.loginErrors.password = 'Password must be at least 6 characters'; $scope.loginValid.password = false; }
    else { $scope.loginErrors.password = ''; $scope.loginValid.password = true; }
  };
  $scope.submitLogin = function() {
    $scope.validateLoginEmail();
    $scope.validateLoginPwd();
    if ($scope.loginErrors.email || $scope.loginErrors.password || !$scope.loginValid.email || !$scope.loginValid.password) return;
    
    // Attempt PHP Backend Authentication
    $http.post('api/auth_api.php', {
      email: $scope.login.email,
      password: $scope.login.password
    }).then(function(response) {
      if (response.data.status === 'success') {
        processLoginSuccess(response.data.user);
      }
    }, function(error) {
      // Fallback to locally seeded users for offline/demo reliability
      var found = $scope.users.find(u => u.email === $scope.login.email && u.password === $scope.login.password);
      if (found) {
        processLoginSuccess(found);
      } else {
        $scope.loginErrors.email = 'Invalid credentials (PHP API or Local). Try admin@streamvault.com / admin123';
      }
    });
  };

  function processLoginSuccess(user) {
    $scope.loginSuccessName = user.name;
    $scope.loginSuccess = true;
    $timeout(function() {
      $scope.currentUser = user;
      $scope.page = 'dashboard';
      $scope.login = {};
      $scope.loginErrors = {};
      $scope.loginValid = {};
      $scope.loginSuccess = false;
      
      // Notify about Java Backend functionality
      console.log("Java Servlet (JDBC) ready for video CRUD at /VideoServlet");
    }, 1000);
  }

  // ---- AUTH: REGISTER VALIDATION (AngularJS) ----
  var nameRx = /^[A-Za-z][A-Za-z\s]{1,29}$/;
  var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var mobileRx = /^(\+91[\s\-]?)?[6-9]\d{9}$|^\d{10}$/;
  $scope.validateReg = function(field) {
    var v = $scope.reg[field] || '';
    var e = '';
    if (field==='firstName') { if(!v) e='First name is required'; else if(!nameRx.test(v)) e='Name must be 2–30 letters only'; }
    if (field==='lastName')  { if(!v) e='Last name is required';  else if(!nameRx.test(v)) e='Name must be 2–30 letters only'; }
    if (field==='username')  { if(!v) e='Username is required'; else if(!/^[a-zA-Z0-9_]{3,20}$/.test(v)) e='3–20 chars, letters/numbers/underscore only'; }
    if (field==='mobile')    { if(!v) e='Mobile is required'; else if(!mobileRx.test(v.replace(/\s/g,''))) e='Enter a valid 10-digit mobile number'; }
    if (field==='email')     { if(!v) e='Email is required'; else if(!emailRx.test(v)) e='Enter a valid email address'; }
    if (field==='password')  {
      if(!v) e='Password is required';
      else if(v.length<8) e='Minimum 8 characters required';
      else if(!/[A-Z]/.test(v)) e='Must include at least one uppercase letter';
      else if(!/[0-9]/.test(v)) e='Must include at least one number';
    }
    if (field==='confirmPassword') {
      if(!v) e='Please confirm your password';
      else if(v !== $scope.reg.password) e='Passwords do not match';
    }
    $scope.regErrors[field] = e;
  };
  $scope.updateStrength = function() {
    var p = $scope.reg.password || '';
    var s = 0;
    if (p.length>=8) s+=25; if (/[A-Z]/.test(p)) s+=25;
    if (/[0-9]/.test(p)) s+=25; if (/[^A-Za-z0-9]/.test(p)) s+=25;
    var el = document.getElementById('strengthFill');
    if (el) { el.style.width=s+'%'; el.style.background=s<50?'var(--accent)':s<75?'var(--amber)':'var(--teal)'; }
  };
  $scope.submitRegister = function() {
    ['firstName','lastName','username','mobile','email','password','confirmPassword'].forEach($scope.validateReg);
    var hasErr = Object.values($scope.regErrors).some(e=>!!e);
    if (hasErr) return;
    $scope.users.push({ email: $scope.reg.email, password: $scope.reg.password, name: $scope.reg.firstName + ' ' + $scope.reg.lastName });
    $scope.registerSuccess = true;
    $timeout(function(){ $scope.registerSuccess=false; $scope.authTab='login'; $scope.reg={}; $scope.regErrors={}; }, 2000);
  };

  // ---- LOGOUT ----
  $scope.logout = function() { $scope.currentUser=null; $scope.page='login'; $scope.authTab='login'; };

  // ---- VIDEO SEARCH/FILTER ----
  $scope.videoSearchFn = function() {
    return function(v) {
      var s = ($scope.videoSearch||'').toLowerCase();
      var gf = $scope.videoFilter;
      var sf = $scope.videoStatusFilter;
      return (!s || v.title.toLowerCase().includes(s) || v.genre.toLowerCase().includes(s))
        && (!gf || v.genre===gf) && (!sf || v.status===sf);
    };
  };
  $scope.subSearchFn = function() {
    return function(s) {
      var q = ($scope.subSearch||'').toLowerCase();
      var pf = $scope.subPlanFilter;
      return (!q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
        && (!pf || s.plan===pf);
    };
  };
  $scope.notifFilterFn = function() {
    return function(n) {
      if ($scope.notifFilter==='all') return true;
      if ($scope.notifFilter==='unread') return !n.read;
      return n.category===$scope.notifFilter;
    };
  };

  // ---- UPLOAD VALIDATION ----
  $scope.simulateUpload = function(file) {
    $scope.uploading = true; $scope.uploadProgress = 0;
    var tick = setInterval(function(){
      $scope.uploadProgress += Math.random()*15;
      if ($scope.uploadProgress>=100) { $scope.uploadProgress=100; $scope.uploading=false; clearInterval(tick); }
      $scope.$apply();
    }, 200);
  };
  $scope.validateUpload = function(f) {
    var v = $scope.upload[f]||'';
    var e = '';
    if (f==='title') { if(!v) e='Title is required'; else if(v.length<3) e='Title must be at least 3 characters'; }
    if (f==='description') { if(!v) e='Description is required'; else if(v.length<10) e='Description too short (min 10 chars)'; }
    if (f==='genre') { if(!v) e='Please select a genre'; }
    if (f==='duration') { if(!v) e='Duration is required'; else if(!/^\d{1,2}:\d{2}:\d{2}$/.test(v)) e='Format: HH:MM:SS (e.g. 01:45:30)'; }
    if (f==='year') { if(!v) e='Year is required'; else if(!/^\d{4}$/.test(v)||+v<1900||+v>2030) e='Enter a valid year (1900–2030)'; }
    $scope.uploadErrors[f] = e;
  };
  $scope.submitUpload = function() {
    ['title','description','genre','duration','year'].forEach($scope.validateUpload);
    if (Object.values($scope.uploadErrors).some(e=>!!e)) return;
    var nv = { id: Date.now(), title: $scope.upload.title, genre: $scope.upload.genre, duration: $scope.upload.duration,
      views:0, rating:0, status: $scope.upload.publishNow?'active':'pending',
      emoji: $scope.upload.emoji||'🎬', watchTime:0, revenue:0, year: $scope.upload.year };
    $scope.videos.unshift(nv);
    $scope.stats.totalVideos = $scope.videos.length;
    $scope.uploadedTitle = nv.title;
    $scope.uploadSuccess = true;
    $scope.notifications.unshift({id:Date.now(),title:'Video Uploaded',body:'"'+nv.title+'" has been added to the library',category:'system',time:'Just now',read:false});
    $timeout(function(){ $scope.uploadSuccess=false; $scope.upload={emoji:'🎬',plan:'free',comments:true,publishNow:true}; $scope.uploadErrors={}; }, 3000);
  };
  $scope.resetUpload = function() { $scope.upload={emoji:'🎬',plan:'free',comments:true,publishNow:true}; $scope.uploadErrors={}; };

  // ---- QUICK UPLOAD ----
  $scope.validateQuick = function(f) {
    var v = $scope.quick[f]||'';
    var e = '';
    if (f==='title') { if(!v) e='Title required'; else if(v.length<3) e='Too short'; }
    if (f==='genre') { if(!v) e='Select a genre'; }
    if (f==='duration') { if(!v) e='Required'; else if(!/^\d{1,2}:\d{2}:\d{2}$/.test(v)) e='Format: HH:MM:SS'; }
    $scope.quickErr[f] = e;
  };
  $scope.submitQuickUpload = function() {
    ['title','genre','duration'].forEach($scope.validateQuick);
    if (Object.values($scope.quickErr).some(e=>!!e)) return;
    var nv = { id:Date.now(), title:$scope.quick.title, genre:$scope.quick.genre, duration:$scope.quick.duration,
      views:0, rating:0, status:'active', emoji:$scope.quick.emoji||'🎬', watchTime:0, revenue:0, year:2024 };
    $scope.videos.unshift(nv);
    $scope.stats.totalVideos=$scope.videos.length;
    $scope.uploadedTitle=nv.title;
    $scope.modalUploadSuccess=true;
    $timeout(function(){ $scope.modalUploadSuccess=false; $scope.modal=''; $scope.quick={emoji:'🎬'}; $scope.quickErr={}; },1500);
  };

  // ---- SUBSCRIBER ----
  $scope.validateNewSub = function(f) {
    var v = $scope.newSub[f]||'';
    var e = '';
    if (f==='name') { if(!v) e='Name required'; else if(!/^[A-Za-z\s]{2,40}$/.test(v)) e='Enter a valid name'; }
    if (f==='mobile') { if(!v) e='Mobile required'; else if(!mobileRx.test(v.replace(/\s/g,''))) e='Invalid mobile number'; }
    if (f==='email') { if(!v) e='Email required'; else if(!emailRx.test(v)) e='Invalid email'; }
    $scope.subErr[f] = e;
  };
  $scope.submitNewSub = function() {
    ['name','mobile','email'].forEach($scope.validateNewSub);
    if (Object.values($scope.subErr).some(e=>!!e)) return;
    var colors = ['#E5383B','#4D7EFF','#00C9A7','#FFB830','#9B59B6','#1ABC9C'];
    var ns = { id:Date.now(), name:$scope.newSub.name, email:$scope.newSub.email, mobile:$scope.newSub.mobile,
      plan:$scope.newSub.plan, status:$scope.newSub.status||'active', watchHours:0,
      joined:'Apr 2025', color:colors[Math.floor(Math.random()*colors.length)] };
    $scope.subscribers.unshift(ns);
    $scope.stats.subscribers=$scope.subscribers.length;
    $scope.subAddSuccess=true;
    $timeout(function(){ $scope.subAddSuccess=false; $scope.modal=''; $scope.newSub={plan:'free',status:'active'}; $scope.subErr={}; },1500);
  };
  $scope.deleteSub = function(s) { if(confirm('Remove subscriber '+s.name+'?')) $scope.subscribers.splice($scope.subscribers.indexOf(s),1); $scope.stats.subscribers=$scope.subscribers.length; };
  $scope.toggleSubStatus = function(s) { s.status = s.status==='active'?'inactive':'active'; };
  $scope.editSub = function(s) { alert('Edit subscriber: '+s.name+'\n(Feature opens full edit form in production)'); };

  // ---- EDIT VIDEO ----
  $scope.editVideo = function(v) { $scope.editVRef=v; $scope.editV=angular.copy(v); $scope.modal='editVideo'; };
  $scope.saveEditVideo = function() {
    if (!$scope.editV.title) return;
    angular.extend($scope.editVRef, $scope.editV);
    $scope.modal='';
  };
  $scope.deleteVideo = function(v) { if(confirm('Delete "'+v.title+'"?')) { $scope.videos.splice($scope.videos.indexOf(v),1); $scope.stats.totalVideos=$scope.videos.length; } };

  // ---- MODALS ----
  $scope.openModal = function(m) { $scope.modal=m; };
  $scope.closeModal = function() { $scope.modal=''; };

  // ---- NOTIFICATIONS ----
  $scope.unreadCount = function() { return $scope.notifications.filter(n=>!n.read).length; };
  $scope.markAllRead = function() { $scope.notifications.forEach(n=>n.read=true); };
});
