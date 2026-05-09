// App Privacy Policy Generator 2026 - Premium Edition
let state = {
    wizardStep: 1,
    totalSteps: 8,
    appName: "[App Name]",
    appContact: "[Contact Email]",
    effectiveFromDate: new Date().toISOString().slice(0, 10),
    typeOfPolicyInt: 1, // 1: Standard, 2: Strict, 3: GDPR
    typeOfDev: "Individual",
    devName: "[Developer Name]",
    iOrWe: "I",
    pidInfoIn: "",
    osType: "Android",
    typeOfApp: "Free",
    isLocationTracked: false,
    isAIUsed: false,
    accountDeletionUrl: "",
    accountDeletionInstructions: "",
    isTargetingChildren: false,
    permissionsXml: "",
    detectedPermissions: [],
    personalDataPoints: {
        name: false,
        email: false,
        phone: false,
        address: false,
        deviceId: false,
        ipAddress: false
    },
    dataCollectionDetails: {
        location: false,
        personalInfo: false,
        financialInfo: false,
        contacts: false,
        photosVideos: false,
        deviceIds: false
    }
};

const androidPermissionMap = {
    // Hardware & Sensors
    "android.permission.CAMERA": { label: "Camera", desc: "Allows the app to take pictures and record videos." },
    "android.permission.RECORD_AUDIO": { label: "Microphone", desc: "Allows the app to record audio using the microphone." },
    "android.permission.VIBRATE": { label: "Vibration", desc: "Allows the app to control the vibrator." },
    "android.permission.FLASHLIGHT": { label: "Flashlight", desc: "Allows the app to control the flashlight." },
    "android.permission.BODY_SENSORS": { label: "Body Sensors", desc: "Allows the app to access data from sensors about your vital signs." },
    "android.permission.USE_BIOMETRIC": { label: "Biometrics", desc: "Allows the app to use biometric hardware for authentication." },
    "android.permission.USE_FINGERPRINT": { label: "Fingerprint", desc: "Allows the app to use fingerprint hardware for authentication." },
    "android.permission.HIGH_SAMPLING_RATE_SENSORS": { label: "High Rate Sensors", desc: "Allows the app to sample sensor data at a high rate." },

    // Location
    "android.permission.ACCESS_FINE_LOCATION": { label: "Precise Location", desc: "Allows the app to get your precise location using GPS or network sources." },
    "android.permission.ACCESS_COARSE_LOCATION": { label: "Approximate Location", desc: "Allows the app to get your approximate location using network sources." },
    "android.permission.ACCESS_BACKGROUND_LOCATION": { label: "Background Location", desc: "Allows the app to access location in the background." },
    "android.permission.ACCESS_LOCATION_EXTRA_COMMANDS": { label: "Location Extra Commands", desc: "Allows the app to access extra location provider commands." },

    // Storage & Media
    "android.permission.READ_EXTERNAL_STORAGE": { label: "Read Storage", desc: "Allows the app to read files from your device storage." },
    "android.permission.WRITE_EXTERNAL_STORAGE": { label: "Write Storage", desc: "Allows the app to write files to your device storage." },
    "android.permission.MANAGE_EXTERNAL_STORAGE": { label: "Manage Storage", desc: "Allows the app to manage broad access to external storage." },
    "android.permission.READ_MEDIA_IMAGES": { label: "Media Images", desc: "Allows the app to read image files from your library." },
    "android.permission.READ_MEDIA_VIDEO": { label: "Media Video", desc: "Allows the app to read video files from your library." },
    "android.permission.READ_MEDIA_AUDIO": { label: "Media Audio", desc: "Allows the app to read audio files from your library." },
    "android.permission.READ_MEDIA_VISUAL_USER_SELECTED": { label: "User Selected Media", desc: "Allows the app to access specific media files selected by the user." },

    // Connectivity
    "android.permission.INTERNET": { label: "Internet", desc: "Allows the app to create network sockets and use the internet." },
    "android.permission.ACCESS_NETWORK_STATE": { label: "Network State", desc: "Allows the app to view information about network connections." },
    "android.permission.ACCESS_WIFI_STATE": { label: "Wi-Fi State", desc: "Allows the app to view information about Wi-Fi networking." },
    "android.permission.CHANGE_WIFI_STATE": { label: "Change Wi-Fi", desc: "Allows the app to change Wi-Fi connectivity state." },
    "android.permission.NFC": { label: "NFC", desc: "Allows the app to communicate via Near Field Communication." },
    "android.permission.CHANGE_NETWORK_STATE": { label: "Change Network State", desc: "Allows the app to change network connectivity state." },
    "android.permission.BLUETOOTH_SCAN": { label: "Bluetooth Scan", desc: "Allows the app to discover and pair Bluetooth devices." },
    "android.permission.BLUETOOTH_CONNECT": { label: "Bluetooth Connect", desc: "Allows the app to connect to paired Bluetooth devices." },
    "android.permission.BLUETOOTH_ADVERTISE": { label: "Bluetooth Advertise", desc: "Allows the app to advertise to nearby Bluetooth devices." },

    // Personal Data
    "android.permission.READ_CONTACTS": { label: "Read Contacts", desc: "Allows the app to read data about your contacts." },
    "android.permission.WRITE_CONTACTS": { label: "Write Contacts", desc: "Allows the app to modify your contacts." },
    "android.permission.GET_ACCOUNTS": { label: "Account List", desc: "Allows access to the list of accounts in the Accounts Service." },
    "android.permission.READ_CALENDAR": { label: "Read Calendar", desc: "Allows the app to read your calendar events." },
    "android.permission.WRITE_CALENDAR": { label: "Write Calendar", desc: "Allows the app to add or modify calendar events." },
    "android.permission.SEND_SMS": { label: "Send SMS", desc: "Allows the app to send SMS messages." },
    "android.permission.RECEIVE_SMS": { label: "Receive SMS", desc: "Allows the app to receive and process SMS messages." },
    "android.permission.READ_SMS": { label: "Read SMS", desc: "Allows the app to read SMS messages." },
    "android.permission.RECEIVE_WAP_PUSH": { label: "WAP Push", desc: "Allows the app to receive WAP push messages." },
    "android.permission.RECEIVE_MMS": { label: "Receive MMS", desc: "Allows the app to receive and process MMS messages." },

    // Phone
    "android.permission.READ_PHONE_STATE": { label: "Phone State", desc: "Allows the app to access phone features of the device." },
    "android.permission.READ_PHONE_NUMBERS": { label: "Phone Numbers", desc: "Allows the app to read the device's phone number." },
    "android.permission.CALL_PHONE": { label: "Direct Call", desc: "Allows the app to initiate a phone call without going through the Dialer user interface." },
    "android.permission.ANSWER_PHONE_CALLS": { label: "Answer Calls", desc: "Allows the app to answer an incoming phone call." },
    "android.permission.READ_CALL_LOG": { label: "Read Call Log", desc: "Allows the app to read your device's call log." },
    "android.permission.WRITE_CALL_LOG": { label: "Write Call Log", desc: "Allows the app to modify your device's call log." },
    "android.permission.PROCESS_OUTGOING_CALLS": { label: "Process Outgoing Calls", desc: "Allows the app to see the number being dialed during an outgoing call." },

    // System
    "android.permission.POST_NOTIFICATIONS": { label: "Notifications", desc: "Allows the app to send you notifications." },
    "android.permission.FOREGROUND_SERVICE": { label: "Foreground Service", desc: "Allows the app to run services in the foreground." },
    "android.permission.WAKE_LOCK": { label: "Prevent Sleeping", desc: "Allows the app to prevent the processor from sleeping or the screen from dimming." },
    "android.permission.RECEIVE_BOOT_COMPLETED": { label: "Run at Startup", desc: "Allows the app to start itself as soon as the system has finished booting." },
    "android.permission.SYSTEM_ALERT_WINDOW": { label: "Overlay Windows", desc: "Allows the app to display windows on top of other apps." },
    "android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS": { label: "Ignore Battery Optimization", desc: "Allows the app to bypass battery saving restrictions." },
    "android.permission.SCHEDULE_EXACT_ALARM": { label: "Exact Alarms", desc: "Allows the app to schedule exact alarms." },
    "android.permission.USE_EXACT_ALARM": { label: "Use Exact Alarms", desc: "Allows the app to use exact alarm APIs." },

    // Store
    "com.android.vending.BILLING": { label: "In-App Billing", desc: "Allows the app to process in-app purchases and subscriptions." },
    "android.permission.REQUEST_INSTALL_PACKAGES": { label: "Install Packages", desc: "Allows the app to request installing packages." },
    "android.permission.REQUEST_DELETE_PACKAGES": { label: "Delete Packages", desc: "Allows the app to request deleting packages." },
    "android.permission.QUERY_ALL_PACKAGES": { label: "Query All Packages", desc: "Allows the app to see all installed apps on the device." },
    "com.google.android.gms.permission.AD_ID": { label: "Advertising ID", desc: "Allows the app to use the Advertising ID for tracking or analytics." },

    // Extended Permissions
    "android.permission.ACCESS_ALL_DOWNLOADS": { label: "Access All Downloads", desc: "Allows the app to access all files downloaded by the system." },
    "android.permission.ACCESS_BLUETOOTH_SHARE": { label: "Bluetooth Share", desc: "Allows the app to access the Bluetooth share manager." },
    "android.permission.ACCESS_CACHE_FILESYSTEM": { label: "Cache Filesystem", desc: "Allows the app to access the internal cache filesystem." },
    "android.permission.ACCESS_CHECKIN_PROPERTIES": { label: "Checkin Properties", desc: "Allows read/write access to check-in properties." },
    "android.permission.ACCESS_CONTENT_PROVIDERS_EXTERNALLY": { label: "External Content Providers", desc: "Allows the app to access content providers externally." },
    "android.permission.ACCESS_DOWNLOAD_MANAGER": { label: "Download Manager", desc: "Allows the app to access the system Download Manager." },
    "android.permission.ACCESS_DOWNLOAD_MANAGER_ADVANCED": { label: "Advanced Download Manager", desc: "Allows advanced access to the Download Manager." },
    "android.permission.ACCESS_DRM_CERTIFICATES": { label: "DRM Certificates", desc: "Allows the app to access DRM certificates." },
    "android.permission.ACCESS_EPHEMERAL_APPS": { label: "Ephemeral Apps", desc: "Allows the app to access ephemeral app data." },
    "android.permission.ACCESS_FM_RADIO": { label: "FM Radio", desc: "Allows the app to access the FM radio tuner." },
    "android.permission.ACCESS_INPUT_FLINGER": { label: "Input Flinger", desc: "Allows the app to access input flinger services." },
    "android.permission.ACCESS_KEYGUARD_SECURE_STORAGE": { label: "Keyguard Secure Storage", desc: "Allows the app to access secure storage for keyguard." },
    "android.permission.ACCESS_MOCK_LOCATION": { label: "Mock Location", desc: "Allows the app to provide mock locations for testing." },
    "android.permission.ACCESS_MTP": { label: "MTP Access", desc: "Allows the app to access the Media Transfer Protocol." },
    "android.permission.ACCESS_NETWORK_CONDITIONS": { label: "Network Conditions", desc: "Allows the app to observe network condition changes." },
    "android.permission.ACCESS_NOTIFICATIONS": { label: "Notification Access", desc: "Allows the app to read and manage system notifications." },
    "android.permission.ACCESS_NOTIFICATION_POLICY": { label: "Notification Policy", desc: "Allows the app to manage notification policy." },
    "android.permission.ACCESS_PDB_STATE": { label: "PDB State", desc: "Allows the app to access the persistent data block state." },
    "android.permission.ACCESS_SURFACE_FLINGER": { label: "Surface Flinger", desc: "Allows the app to access low-level surface flinger features." },
    "android.permission.ACCESS_VOICE_INTERACTION_SERVICE": { label: "Voice Interaction Service", desc: "Allows the app to access the voice interaction service." },
    "android.permission.ACCESS_VR_MANAGER": { label: "VR Manager", desc: "Allows the app to access the virtual reality manager." },
    "android.permission.ACCESS_WIMAX_STATE": { label: "WiMAX State", desc: "Allows the app to view information about WiMAX networking." },
    "android.permission.ACCOUNT_MANAGER": { label: "Account Manager", desc: "Allows the app to manage user accounts via AccountManager." },
    "android.permission.ALLOW_ANY_CODEC_FOR_PLAYBACK": { label: "Any Codec Playback", desc: "Allows the app to use any codec for media playback." },
    "android.permission.ASEC_ACCESS": { label: "ASEC Access", desc: "Allows the app to access Android Secure Containers." },
    "android.permission.ASEC_CREATE": { label: "ASEC Create", desc: "Allows the app to create Android Secure Containers." },
    "android.permission.ASEC_DESTROY": { label: "ASEC Destroy", desc: "Allows the app to destroy Android Secure Containers." },
    "android.permission.ASEC_MOUNT_UNMOUNT": { label: "ASEC Mount/Unmount", desc: "Allows the app to mount/unmount Android Secure Containers." },
    "android.permission.ASEC_RENAME": { label: "ASEC Rename", desc: "Allows the app to rename Android Secure Containers." },
    "android.permission.AUTHENTICATE_ACCOUNTS": { label: "Authenticate Accounts", desc: "Allows the app to act as an AccountAuthenticator." },
    "android.permission.BACKUP": { label: "System Backup", desc: "Allows the app to access system backup and restore services." },
    "android.permission.BATTERY_STATS": { label: "Battery Stats", desc: "Allows the app to read detailed battery usage statistics." },
    "android.permission.BIND_ACCESSIBILITY_SERVICE": { label: "Accessibility Service", desc: "Allows the app to bind to an accessibility service." },
    "android.permission.BIND_APPWIDGET": { label: "App Widget", desc: "Allows the app to bind to app widgets." },
    "android.permission.BIND_CARRIER_MESSAGING_SERVICE": { label: "Carrier Messaging", desc: "Allows the app to bind to carrier messaging services." },
    "android.permission.BIND_CARRIER_SERVICES": { label: "Carrier Services", desc: "Allows the app to bind to carrier services." },
    "android.permission.BIND_CHOOSER_TARGET_SERVICE": { label: "Chooser Target", desc: "Allows the app to bind to chooser target services." },
    "android.permission.BIND_CONDITION_PROVIDER_SERVICE": { label: "Condition Provider", desc: "Allows the app to bind to condition provider services." },
    "android.permission.BIND_CONNECTION_SERVICE": { label: "Connection Service", desc: "Allows the app to bind to connection services." },
    "android.permission.BIND_DEVICE_ADMIN": { label: "Device Admin", desc: "Allows the app to bind to a device admin service." },
    "android.permission.BIND_DIRECTORY_SEARCH": { label: "Directory Search", desc: "Allows the app to bind to directory search services." },
    "android.permission.BIND_DREAM_SERVICE": { label: "Dream Service", desc: "Allows the app to bind to dream services (screensavers)." },
    "android.permission.BIND_INCALL_SERVICE": { label: "In-Call Service", desc: "Allows the app to bind to in-call services." },
    "android.permission.BIND_INPUT_METHOD": { label: "Input Method", desc: "Allows the app to bind to input methods." },
    "android.permission.BIND_INTENT_FILTER_VERIFIER": { label: "Intent Filter Verifier", desc: "Allows the app to bind to intent filter verifiers." },
    "android.permission.BIND_JOB_SERVICE": { label: "Job Service", desc: "Allows the app to bind to job services." },
    "android.permission.BIND_KEYGUARD_APPWIDGET": { label: "Keyguard Widget", desc: "Allows the app to bind to keyguard widgets." },
    "android.permission.BIND_MIDI_DEVICE_SERVICE": { label: "MIDI Device", desc: "Allows the app to bind to MIDI device services." },
    "android.permission.BIND_NFC_SERVICE": { label: "NFC Service", desc: "Allows the app to bind to NFC services." },
    "android.permission.BIND_NOTIFICATION_LISTENER_SERVICE": { label: "Notification Listener", desc: "Allows the app to bind to notification listener services." },
    "android.permission.BIND_NOTIFICATION_RANKER_SERVICE": { label: "Notification Ranker", desc: "Allows the app to bind to notification ranker services." },
    "android.permission.BIND_PACKAGE_VERIFIER": { label: "Package Verifier", desc: "Allows the app to bind to package verifiers." },
    "android.permission.BIND_PRINT_RECOMMENDATION_SERVICE": { label: "Print Recommendation", desc: "Allows the app to bind to print recommendation services." },
    "android.permission.BIND_PRINT_SERVICE": { label: "Print Service", desc: "Allows the app to bind to print services." },
    "android.permission.BIND_PRINT_SPOOLER_SERVICE": { label: "Print Spooler", desc: "Allows the app to bind to print spooler services." },
    "android.permission.BIND_QUICK_SETTINGS_TILE": { label: "Quick Settings Tile", desc: "Allows the app to bind to quick settings tiles." },
    "android.permission.BIND_REMOTEVIEWS": { label: "Remote Views", desc: "Allows the app to bind to remote views." },
    "android.permission.BIND_REMOTE_DISPLAY": { label: "Remote Display", desc: "Allows the app to bind to remote display services." },
    "android.permission.BIND_ROUTE_PROVIDER": { label: "Route Provider", desc: "Allows the app to bind to route provider services." },
    "android.permission.BIND_RUNTIME_PERMISSION_PRESENTER_SERVICE": { label: "Permission Presenter", desc: "Allows the app to bind to permission presenter services." },
    "android.permission.BIND_SCREENING_SERVICE": { label: "Call Screening", desc: "Allows the app to bind to call screening services." },
    "android.permission.BIND_TELECOM_CONNECTION_SERVICE": { label: "Telecom Connection", desc: "Allows the app to bind to telecom connection services." },
    "android.permission.BIND_TEXT_SERVICE": { label: "Text Service", desc: "Allows the app to bind to text services." },
    "android.permission.BIND_TRUST_AGENT": { label: "Trust Agent", desc: "Allows the app to bind to trust agent services." },
    "android.permission.BIND_TV_INPUT": { label: "TV Input", desc: "Allows the app to bind to TV input services." },
    "android.permission.BIND_TV_REMOTE_SERVICE": { label: "TV Remote", desc: "Allows the app to bind to TV remote services." },
    "android.permission.BIND_VOICE_INTERACTION": { label: "Voice Interaction", desc: "Allows the app to bind to voice interaction services." },
    "android.permission.BIND_VPN_SERVICE": { label: "VPN Service", desc: "Allows the app to bind to VPN services." },
    "android.permission.BIND_VR_LISTENER_SERVICE": { label: "VR Listener", desc: "Allows the app to bind to VR listener services." },
    "android.permission.BIND_WALLPAPER": { label: "Wallpaper Service", desc: "Allows the app to bind to wallpaper services." },
    "android.permission.BLUETOOTH": { label: "Bluetooth", desc: "Allows the app to connect to paired Bluetooth devices." },
    "android.permission.BLUETOOTH_ADMIN": { label: "Bluetooth Admin", desc: "Allows the app to discover and pair Bluetooth devices." },
    "android.permission.BLUETOOTH_MAP": { label: "Bluetooth MAP", desc: "Allows the app to access Bluetooth Message Access Profile." },
    "android.permission.BLUETOOTH_PRIVILEGED": { label: "Bluetooth Privileged", desc: "Allows the app to access Bluetooth features without user interaction." },
    "android.permission.BLUETOOTH_STACK": { label: "Bluetooth Stack", desc: "Allows the app to access the Bluetooth stack directly." },
    "android.permission.BRICK": { label: "Brick Device", desc: "Allows the app to disable the device (high-risk)." },
    "android.permission.BROADCAST_CALLLOG_INFO": { label: "Broadcast Call Log", desc: "Allows the app to broadcast information about call logs." },
    "android.permission.BROADCAST_NETWORK_PRIVILEGED": { label: "Broadcast Network Privileged", desc: "Allows the app to broadcast privileged network info." },
    "android.permission.BROADCAST_PACKAGE_REMOVED": { label: "Package Removed Broadcast", desc: "Allows the app to broadcast that a package was removed." },
    "android.permission.BROADCAST_PHONE_ACCOUNT_REGISTRATION": { label: "Phone Account Broadcast", desc: "Allows the app to broadcast phone account registration info." },
    "android.permission.BROADCAST_SMS": { label: "SMS Broadcast", desc: "Allows the app to broadcast an SMS receipt notification." },
    "android.permission.BROADCAST_STICKY": { label: "Sticky Broadcast", desc: "Allows the app to use sticky broadcasts." },
    "android.permission.BROADCAST_WAP_PUSH": { label: "WAP PUSH Broadcast", desc: "Allows the app to broadcast a WAP PUSH receipt notification." },
    "android.permission.CACHE_CONTENT": { label: "Cache Content", desc: "Allows the app to cache content to storage." },
    "android.permission.CALL_PRIVILEGED": { label: "Privileged Calls", desc: "Allows the app to call any number, including emergency ones, without user confirmation." },
    "android.permission.CAMERA_DISABLE_TRANSMIT_LED": { label: "Disable Camera LED", desc: "Allows the app to disable the camera transmit LED." },
    "android.permission.CAMERA_SEND_SYSTEM_EVENTS": { label: "Camera System Events", desc: "Allows the app to send camera-related system events." },
    "android.permission.CAPTURE_AUDIO_HOTWORD": { label: "Audio Hotword", desc: "Allows the app to capture audio hotwords." },
    "android.permission.CAPTURE_AUDIO_OUTPUT": { label: "Audio Output Capture", desc: "Allows the app to capture audio output." },
    "android.permission.CAPTURE_SECURE_VIDEO_OUTPUT": { label: "Secure Video Capture", desc: "Allows the app to capture secure video output." },
    "android.permission.CAPTURE_TV_INPUT": { label: "TV Input Capture", desc: "Allows the app to capture TV input." },
    "android.permission.CAPTURE_VIDEO_OUTPUT": { label: "Video Output Capture", desc: "Allows the app to capture video output." },
    "android.permission.CARRIER_FILTER_SMS": { label: "Carrier SMS Filter", desc: "Allows the app to filter carrier SMS messages." },
    "android.permission.CHANGE_APP_IDLE_STATE": { label: "App Idle State", desc: "Allows the app to change the idle state of other apps." },
    "android.permission.CHANGE_BACKGROUND_DATA_SETTING": { label: "Background Data Setting", desc: "Allows the app to change background data settings." },
    "android.permission.CHANGE_COMPONENT_ENABLED_STATE": { label: "Component State", desc: "Allows the app to change whether an app component is enabled." },
    "android.permission.CHANGE_CONFIGURATION": { label: "System Configuration", desc: "Allows the app to change the current configuration, such as locale." },
    "android.permission.CHANGE_DEVICE_IDLE_TEMP_WHITELIST": { label: "Idle Whitelist", desc: "Allows the app to change the device idle temporary whitelist." },
    "android.permission.CHANGE_WIFI_MULTICAST_STATE": { label: "Wi-Fi Multicast", desc: "Allows the app to receive Wi-Fi Multicast packets." },
    "android.permission.CHANGE_WIMAX_STATE": { label: "WiMAX State", desc: "Allows the app to change WiMAX connectivity state." },
    "android.permission.CLEAR_APP_CACHE": { label: "Clear Cache", desc: "Allows the app to clear the caches of all installed applications." },
    "android.permission.CLEAR_APP_GRANTED_URI_PERMISSIONS": { label: "Clear URI Permissions", desc: "Allows the app to clear granted URI permissions." },
    "android.permission.CLEAR_APP_USER_DATA": { label: "Clear User Data", desc: "Allows the app to clear user data." },
    "android.permission.CONFIGURE_DISPLAY_COLOR_TRANSFORM": { label: "Display Color Transform", desc: "Allows the app to configure display color transforms." },
    "android.permission.CONFIGURE_WIFI_DISPLAY": { label: "Wi-Fi Display", desc: "Allows the app to configure Wi-Fi displays." },
    "android.permission.CONFIRM_FULL_BACKUP": { label: "Confirm Backup", desc: "Allows the app to confirm full backups." },
    "android.permission.CONNECTIVITY_INTERNAL": { label: "Internal Connectivity", desc: "Allows the app to access internal connectivity services." },
    "android.permission.CONTROL_INCALL_EXPERIENCE": { label: "In-Call Experience", desc: "Allows the app to control the in-call user experience." },
    "android.permission.CONTROL_KEYGUARD": { label: "Control Keyguard", desc: "Allows the app to control the keyguard." },
    "android.permission.CONTROL_LOCATION_UPDATES": { label: "Location Updates", desc: "Allows the app to enable/disable location update notifications." },
    "android.permission.CONTROL_VPN": { label: "Control VPN", desc: "Allows the app to control VPN connections." },
    "android.permission.CONTROL_WIFI_DISPLAY": { label: "Control Wi-Fi Display", desc: "Allows the app to control Wi-Fi displays." },
    "android.permission.COPY_PROTECTED_DATA": { label: "Copy Protected Data", desc: "Allows the app to copy protected data." },
    "android.permission.CREATE_USERS": { label: "Create Users", desc: "Allows the app to create and manage users on the device." },
    "android.permission.CRYPT_KEEPER": { label: "Crypt Keeper", desc: "Allows the app to access the device encryption manager." },
    "android.permission.DELETE_CACHE_FILES": { label: "Delete Cache Files", desc: "Allows the app to delete cache files." },
    "android.permission.DELETE_PACKAGES": { label: "Delete Packages", desc: "Allows the app to delete Android packages." },
    "android.permission.DEVICE_POWER": { label: "Device Power", desc: "Allows low-level access to power management." },
    "android.permission.DIAGNOSTIC": { label: "Diagnostics", desc: "Allows the app to read/write to diagnostic resources." },
    "android.permission.DISABLE_KEYGUARD": { label: "Disable Keyguard", desc: "Allows the app to disable the keyguard if it is not secure." },
    "android.permission.DISPATCH_NFC_MESSAGE": { label: "Dispatch NFC", desc: "Allows the app to dispatch NFC messages." },
    "android.permission.DISPATCH_PROVISIONING_MESSAGE": { label: "Provisioning Message", desc: "Allows the app to dispatch provisioning messages." },
    "android.permission.DOWNLOAD_CACHE_NON_PURGEABLE": { label: "Non-Purgeable Cache", desc: "Allows the app to reserve space in the download cache." },
    "android.permission.DUMP": { label: "System Dump", desc: "Allows the app to retrieve state dump information from system services." },
    "android.permission.DVB_DEVICE": { label: "DVB Device", desc: "Allows the app to access Digital Video Broadcasting devices." },
    "android.permission.EXPAND_STATUS_BAR": { label: "Expand Status Bar", desc: "Allows the app to expand or collapse the status bar." },
    "android.permission.FACTORY_TEST": { label: "Factory Test", desc: "Allows the app to run as a manufacturer test application." },
    "android.permission.FILTER_EVENTS": { label: "Filter Events", desc: "Allows the app to filter system events." },
    "android.permission.FORCE_BACK": { label: "Force Back", desc: "Allows the app to force a BACK operation." },
    "android.permission.FORCE_STOP_PACKAGES": { label: "Force Stop Apps", desc: "Allows the app to force stop other applications." },
    "android.permission.FRAME_STATS": { label: "Frame Statistics", desc: "Allows the app to read frame statistics." },
    "android.permission.FREEZE_SCREEN": { label: "Freeze Screen", desc: "Allows the app to freeze the screen." },
    "android.permission.GET_ACCOUNTS_PRIVILEGED": { label: "Privileged Accounts", desc: "Allows the app to access the list of accounts in the Accounts Service." },
    "android.permission.GET_APP_GRANTED_URI_PERMISSIONS": { label: "App URI Permissions", desc: "Allows the app to get granted URI permissions." },
    "android.permission.GET_APP_OPS_STATS": { label: "App Ops Stats", desc: "Allows the app to get app operation statistics." },
    "android.permission.GET_DETAILED_TASKS": { label: "Detailed Tasks", desc: "Allows the app to get detailed information about running tasks." },
    "android.permission.GET_INTENT_SENDER_INTENT": { label: "Intent Sender Intent", desc: "Allows the app to get the intent from an intent sender." },
    "android.permission.GET_PACKAGE_IMPORTANCE": { label: "Package Importance", desc: "Allows the app to get information about package importance." },
    "android.permission.GET_PACKAGE_SIZE": { label: "Package Size", desc: "Allows the app to find out the space used by any package." },
    "android.permission.GET_PASSWORD": { label: "Get Password", desc: "Allows the app to retrieve user passwords (high-risk)." },
    "android.permission.GET_PROCESS_STATE_AND_OOM_SCORE": { label: "Process State/OOM Score", desc: "Allows the app to get process state and OOM scores." },
    "android.permission.GET_TOP_ACTIVITY_INFO": { label: "Top Activity Info", desc: "Allows the app to get information about the top activity." },
    "android.permission.GLOBAL_SEARCH": { label: "Global Search", desc: "Allows the app to use global search." },
    "android.permission.GLOBAL_SEARCH_CONTROL": { label: "Global Search Control", desc: "Allows the app to control global search." },
    "android.permission.GRANT_RUNTIME_PERMISSIONS": { label: "Grant Runtime Permissions", desc: "Allows the app to grant runtime permissions." },
    "android.permission.HARDWARE_TEST": { label: "Hardware Test", desc: "Allows the app to access hardware for testing." },
    "android.permission.HDMI_CEC": { label: "HDMI CEC", desc: "Allows the app to control HDMI CEC features." },
    "android.permission.INJECT_EVENTS": { label: "Inject Events", desc: "Allows the app to inject user events (keys, touch, etc.) into the event stream." },
    "android.permission.INSTALL_GRANT_RUNTIME_PERMISSIONS": { label: "Install Grant Permissions", desc: "Allows the app to grant runtime permissions during install." },
    "android.permission.INSTALL_LOCATION_PROVIDER": { label: "Location Provider", desc: "Allows the app to install a location provider into the Location Manager." },
    "android.permission.INTENT_FILTER_VERIFICATION_AGENT": { label: "Intent Filter Agent", desc: "Allows the app to act as an intent filter verification agent." },
    "android.permission.INTERACT_ACROSS_USERS": { label: "Interact Across Users", desc: "Allows the app to interact across different users on the device." },
    "android.permission.INTERACT_ACROSS_USERS_FULL": { label: "Full Interaction Across Users", desc: "Allows full interaction across users." },
    "android.permission.INTERNAL_SYSTEM_WINDOW": { label: "System Window", desc: "Allows the app to open windows that are used by the system." },
    "android.permission.INVOKE_CARRIER_SETUP": { label: "Carrier Setup", desc: "Allows the app to invoke the carrier-specific configuration app." },
    "android.permission.KILL_BACKGROUND_PROCESSES": { label: "Kill Background Processes", desc: "Allows the app to call killBackgroundProcesses(String)." },
    "android.permission.KILL_UID": { label: "Kill UID", desc: "Allows the app to kill processes by UID." },
    "android.permission.LAUNCH_TRUST_AGENT_SETTINGS": { label: "Trust Agent Settings", desc: "Allows the app to launch trust agent settings." },
    "android.permission.LOCAL_MAC_ADDRESS": { label: "MAC Address", desc: "Allows the app to retrieve the local MAC address." },
    "android.permission.LOCATION_HARDWARE": { label: "Location Hardware", desc: "Allows the app to use hardware location features." },
    "android.permission.LOOP_RADIO": { label: "Loop Radio", desc: "Allows the app to loop radio audio." },
    "android.permission.MANAGE_ACCOUNTS": { label: "Manage Accounts", desc: "Allows the app to manage the list of accounts." },
    "android.permission.MANAGE_ACTIVITY_STACKS": { label: "Activity Stacks", desc: "Allows the app to manage activity stacks." },
    "android.permission.MANAGE_APP_OPS_RESTRICTIONS": { label: "App Ops Restrictions", desc: "Allows the app to manage app operation restrictions." },
    "android.permission.MANAGE_APP_TOKENS": { label: "App Tokens", desc: "Allows the app to manage app tokens." },
    "android.permission.MANAGE_CA_CERTIFICATES": { label: "CA Certificates", desc: "Allows the app to manage CA certificates." },
    "android.permission.MANAGE_DEVICE_ADMINS": { label: "Manage Device Admins", desc: "Allows the app to manage device administrators." },
    "android.permission.MANAGE_DOCUMENTS": { label: "Manage Documents", desc: "Allows the app to manage access to documents." },
    "android.permission.MANAGE_FINGERPRINT": { label: "Manage Fingerprint", desc: "Allows the app to manage fingerprint hardware." },
    "android.permission.MANAGE_MEDIA_PROJECTION": { label: "Media Projection", desc: "Allows the app to manage media projection." },
    "android.permission.MANAGE_NETWORK_POLICY": { label: "Network Policy", desc: "Allows the app to manage network policies." },
    "android.permission.MANAGE_NOTIFICATIONS": { label: "Manage Notifications", desc: "Allows the app to manage notifications." },
    "android.permission.MANAGE_PROFILE_AND_DEVICE_OWNERS": { label: "Profile/Device Owners", desc: "Allows the app to manage profile and device owners." },
    "android.permission.MANAGE_SOUND_TRIGGER": { label: "Sound Trigger", desc: "Allows the app to manage sound triggers." },
    "android.permission.MANAGE_USB": { label: "Manage USB", desc: "Allows the app to manage USB devices." },
    "android.permission.MANAGE_USERS": { label: "Manage Users", desc: "Allows the app to manage users." },
    "android.permission.MANAGE_VOICE_KEYPHRASES": { label: "Voice Keyphrases", desc: "Allows the app to manage voice keyphrases." },
    "android.permission.MASTER_CLEAR": { label: "Master Clear", desc: "Allows the app to reset the device to factory settings." },
    "android.permission.MEDIA_CONTENT_CONTROL": { label: "Media Content Control", desc: "Allows the app to control media playback and metadata." },
    "android.permission.MODIFY_APPWIDGET_BIND_PERMISSIONS": { label: "Widget Permissions", desc: "Allows the app to modify widget bind permissions." },
    "android.permission.MODIFY_AUDIO_ROUTING": { label: "Audio Routing", desc: "Allows the app to modify audio routing." },
    "android.permission.MODIFY_CELL_BROADCASTS": { label: "Cell Broadcasts", desc: "Allows the app to modify cell broadcasts." },
    "android.permission.MODIFY_DAY_NIGHT_MODE": { label: "Day/Night Mode", desc: "Allows the app to modify day/night mode." },
    "android.permission.MODIFY_NETWORK_ACCOUNTING": { label: "Network Accounting", desc: "Allows the app to modify network accounting info." },
    "android.permission.MODIFY_PARENTAL_CONTROLS": { label: "Parental Controls", desc: "Allows the app to modify parental controls." },
    "android.permission.MODIFY_PHONE_STATE": { label: "Phone State", desc: "Allows the app to modify the phone state, e.g., power on." },
    "android.permission.MOUNT_FORMAT_FILESYSTEMS": { label: "Format Filesystems", desc: "Allows the app to format removable storage filesystems." },
    "android.permission.MOUNT_UNMOUNT_FILESYSTEMS": { label: "Mount/Unmount", desc: "Allows the app to mount and unmount filesystems for removable storage." },
    "android.permission.MOVE_PACKAGE": { label: "Move Package", desc: "Allows the app to move app packages between storage locations." },
    "android.permission.NET_ADMIN": { label: "Net Admin", desc: "Allows the app to manage network configurations." },
    "android.permission.NET_TUNNELING": { label: "Net Tunneling", desc: "Allows the app to use network tunneling." },
    "android.permission.NFC_HANDOVER_STATUS": { label: "NFC Handover", desc: "Allows the app to receive NFC handover status." },
    "android.permission.NOTIFY_PENDING_SYSTEM_UPDATE": { label: "System Update Notify", desc: "Allows the app to notify about pending system updates." },
    "android.permission.OBSERVE_GRANT_REVOKE_PERMISSIONS": { label: "Observe Permissions", desc: "Allows the app to observe permission grant/revoke events." },
    "android.permission.OEM_UNLOCK_STATE": { label: "OEM Unlock State", desc: "Allows the app to read/write OEM unlock state." },
    "android.permission.OVERRIDE_WIFI_CONFIG": { label: "Override Wi-Fi Config", desc: "Allows the app to override Wi-Fi configurations." },
    "android.permission.PACKAGE_USAGE_STATS": { label: "App Usage Stats", desc: "Allows the app to collect component usage statistics." },
    "android.permission.PACKAGE_VERIFICATION_AGENT": { label: "Package Verification", desc: "Allows the app to act as a package verification agent." },
    "android.permission.PACKET_KEEPALIVE_OFFLOAD": { label: "Packet Keepalive", desc: "Allows the app to use packet keepalive offload." },
    "android.permission.PEERS_MAC_ADDRESS": { label: "Peers MAC Address", desc: "Allows the app to retrieve the MAC address of peer devices." },
    "android.permission.PERFORM_CDMA_PROVISIONING": { label: "CDMA Provisioning", desc: "Allows the app to perform CDMA provisioning." },
    "android.permission.PERFORM_SIM_ACTIVATION": { label: "SIM Activation", desc: "Allows the app to perform SIM activation." },
    "android.permission.PERSISTENT_ACTIVITY": { label: "Persistent Activity", desc: "Allows the app to make its activities persistent." },
    "android.permission.PROCESS_CALLLOG_INFO": { label: "Process Call Log Info", desc: "Allows the app to process call log information." },
    "android.permission.PROCESS_PHONE_ACCOUNT_REGISTRATION": { label: "Process Phone Account", desc: "Allows the app to process phone account registration." },
    "android.permission.PROVIDE_TRUST_AGENT": { label: "Provide Trust Agent", desc: "Allows the app to provide a trust agent." },
    "android.permission.QUERY_DO_NOT_ASK_CREDENTIALS_ON_BOOT": { label: "Credentials On Boot", desc: "Allows the app to query credential settings on boot." },
    "android.permission.READ_BLOCKED_NUMBERS": { label: "Read Blocked Numbers", desc: "Allows the app to read blocked numbers." },
    "android.permission.READ_DREAM_STATE": { label: "Read Dream State", desc: "Allows the app to read the dream state." },
    "android.permission.READ_FRAME_BUFFER": { label: "Read Frame Buffer", desc: "Allows the app to take screen shots and more generally get access to the frame buffer data." },
    "android.permission.READ_INPUT_STATE": { label: "Read Input State", desc: "Allows the app to retrieve the current state of keys and switches." },
    "android.permission.READ_INSTALL_SESSIONS": { label: "Read Install Sessions", desc: "Allows the app to read install sessions." },
    "android.permission.READ_LOGS": { label: "Read System Logs", desc: "Allows the app to read low-level system log files." },
    "android.permission.READ_NETWORK_USAGE_HISTORY": { label: "Network History", desc: "Allows the app to read historical network usage." },
    "android.permission.READ_OEM_UNLOCK_STATE": { label: "Read OEM Unlock", desc: "Allows the app to read the OEM unlock state." },
    "android.permission.READ_PRECISE_PHONE_STATE": { label: "Precise Phone State", desc: "Allows the app to read precise phone state info." },
    "android.permission.READ_PRIVILEGED_PHONE_STATE": { label: "Privileged Phone State", desc: "Allows the app to read privileged phone state info." },
    "android.permission.READ_PROFILE": { label: "Read User Profile", desc: "Allows the app to read the user's personal profile information." },
    "android.permission.READ_SEARCH_INDEXABLES": { label: "Read Search Index", desc: "Allows the app to read search indexables." },
    "android.permission.READ_SOCIAL_STREAM": { label: "Read Social Stream", desc: "Allows the app to read the user's social stream." },
    "android.permission.READ_SYNC_SETTINGS": { label: "Read Sync Settings", desc: "Allows the app to read the sync settings." },
    "android.permission.READ_SYNC_STATS": { label: "Read Sync Stats", desc: "Allows the app to read the sync stats." },
    "android.permission.READ_USER_DICTIONARY": { label: "Read User Dictionary", desc: "Allows the app to read the user dictionary." },
    "android.permission.READ_WIFI_CREDENTIAL": { label: "Read Wi-Fi Credential", desc: "Allows the app to read Wi-Fi credentials." },
    "android.permission.REAL_GET_TASKS": { label: "Real Get Tasks", desc: "Allows the app to get information about running tasks." },
    "android.permission.REBOOT": { label: "Reboot Device", desc: "Allows the app to reboot the device." },
    "android.permission.RECEIVE_BLUETOOTH_MAP": { label: "Receive Bluetooth MAP", desc: "Allows the app to receive Bluetooth MAP notifications." },
    "android.permission.RECEIVE_DATA_ACTIVITY_CHANGE": { label: "Data Activity Change", desc: "Allows the app to receive data activity change notifications." },
    "android.permission.RECEIVE_EMERGENCY_BROADCAST": { label: "Emergency Broadcast", desc: "Allows the app to receive emergency broadcasts." },
    "android.permission.RECEIVE_MEDIA_RESOURCE_USAGE": { label: "Media Resource Usage", desc: "Allows the app to receive media resource usage info." },
    "android.permission.RECEIVE_STK_COMMANDS": { label: "Receive STK Commands", desc: "Allows the app to receive SIM ToolKit commands." },
    "android.permission.RECEIVE_WIFI_CREDENTIAL_CHANGE": { label: "Wi-Fi Credential Change", desc: "Allows the app to receive Wi-Fi credential change notifications." },
    "android.permission.RECOVERY": { label: "Recovery Mode", desc: "Allows the app to access recovery mode." },
    "android.permission.REGISTER_CALL_PROVIDER": { label: "Call Provider", desc: "Allows the app to register a call provider." },
    "android.permission.REGISTER_CONNECTION_MANAGER": { label: "Connection Manager", desc: "Allows the app to register a connection manager." },
    "android.permission.REGISTER_SIM_SUBSCRIPTION": { label: "SIM Subscription", desc: "Allows the app to register a SIM subscription." },
    "android.permission.REGISTER_WINDOW_MANAGER_LISTENERS": { label: "Window Manager Listeners", desc: "Allows the app to register window manager listeners." },
    "android.permission.REMOTE_AUDIO_PLAYBACK": { label: "Remote Audio Playback", desc: "Allows the app to use remote audio playback." },
    "android.permission.REMOVE_DRM_CERTIFICATES": { label: "Remove DRM Certificates", desc: "Allows the app to remove DRM certificates." },
    "android.permission.REMOVE_TASKS": { label: "Remove Tasks", desc: "Allows the app to remove tasks from the system." },
    "android.permission.REORDER_TASKS": { label: "Reorder Tasks", desc: "Allows the app to change the Z-order of tasks." },
    "android.permission.RESET_FINGERPRINT_LOCKOUT": { label: "Reset Fingerprint Lockout", desc: "Allows the app to reset fingerprint lockout." },
    "android.permission.RESET_SHORTCUT_MANAGER_THROTTLING": { label: "Reset Shortcut Throttling", desc: "Allows the app to reset shortcut manager throttling." },
    "android.permission.RESTART_PACKAGES": { label: "Restart Apps", desc: "Allows the app to restart other applications." },
    "android.permission.RETRIEVE_WINDOW_CONTENT": { label: "Window Content", desc: "Allows the app to retrieve window content." },
    "android.permission.RETRIEVE_WINDOW_TOKEN": { label: "Window Token", desc: "Allows the app to retrieve window tokens." },
    "android.permission.REVOKE_RUNTIME_PERMISSIONS": { label: "Revoke Permissions", desc: "Allows the app to revoke runtime permissions." },
    "android.permission.SCORE_NETWORKS": { label: "Score Networks", desc: "Allows the app to score networks." },
    "android.permission.SEND_CALL_LOG_CHANGE": { label: "Send Call Log Change", desc: "Allows the app to send call log change info." },
    "android.permission.SEND_DOWNLOAD_COMPLETED_INTENTS": { label: "Download Completed Intent", desc: "Allows the app to send download completed intents." },
    "android.permission.SEND_RESPOND_VIA_MESSAGE": { label: "Respond Via Message", desc: "Allows the app to send a message when a call is rejected." },
    "android.permission.SEND_SMS_NO_CONFIRMATION": { label: "Direct SMS", desc: "Allows the app to send SMS messages without user interaction." },
    "android.permission.SERIAL_PORT": { label: "Serial Port", desc: "Allows the app to access serial ports." },
    "android.permission.SET_ACTIVITY_WATCHER": { label: "Activity Watcher", desc: "Allows the app to watch activity starts/stops." },
    "android.permission.SET_ALWAYS_FINISH": { label: "Always Finish", desc: "Allows the app to control whether activities are always finished when moved to background." },
    "android.permission.SET_ANIMATION_SCALE": { label: "Animation Scale", desc: "Allows the app to change the global animation scale." },
    "android.permission.SET_DEBUG_APP": { label: "Debug App", desc: "Allows the app to set an application for debugging." },
    "android.permission.SET_INPUT_CALIBRATION": { label: "Input Calibration", desc: "Allows the app to set input calibration." },
    "android.permission.SET_KEYBOARD_LAYOUT": { label: "Keyboard Layout", desc: "Allows the app to set the keyboard layout." },
    "android.permission.SET_ORIENTATION": { label: "Set Orientation", desc: "Allows the app to change the screen orientation." },
    "android.permission.SET_POINTER_SPEED": { label: "Pointer Speed", desc: "Allows the app to set the pointer speed." },
    "android.permission.SET_PREFERRED_APPLICATIONS": { label: "Preferred Apps", desc: "Allows the app to set preferred applications." },
    "android.permission.SET_PROCESS_LIMIT": { label: "Process Limit", desc: "Allows the app to set the maximum number of running processes." },
    "android.permission.SET_SCREEN_COMPATIBILITY": { label: "Screen Compatibility", desc: "Allows the app to set screen compatibility mode." },
    "android.permission.SET_TIME": { label: "Set Time", desc: "Allows the app to set the system time." },
    "android.permission.SET_TIME_ZONE": { label: "Set Time Zone", desc: "Allows the app to set the system time zone." },
    "android.permission.SET_WALLPAPER": { label: "Set Wallpaper", desc: "Allows the app to set the desktop wallpaper." },
    "android.permission.SET_WALLPAPER_COMPONENT": { label: "Set Wallpaper Component", desc: "Allows the app to set the wallpaper component." },
    "android.permission.SET_WALLPAPER_HINTS": { label: "Set Wallpaper Hints", desc: "Allows the app to set the wallpaper hints." },
    "android.permission.SHUTDOWN": { label: "Shutdown", desc: "Allows the app to shutdown the system." },
    "android.permission.SIGNAL_PERSISTENT_PROCESSES": { label: "Signal Processes", desc: "Allows the app to send signals to persistent processes." },
    "android.permission.START_ANY_ACTIVITY": { label: "Start Any Activity", desc: "Allows the app to start any activity." },
    "android.permission.START_PRINT_SERVICE_CONFIG_ACTIVITY": { label: "Print Service Config", desc: "Allows the app to start the print service config activity." },
    "android.permission.START_TASKS_FROM_RECENTS": { label: "Start Recents Tasks", desc: "Allows the app to start tasks from the recents list." },
    "android.permission.STATUS_BAR": { label: "Status Bar", desc: "Allows the app to open, close, or disable the status bar." },
    "android.permission.STATUS_BAR_SERVICE": { label: "Status Bar Service", desc: "Allows the app to be the status bar service." },
    "android.permission.STOP_APP_SWITCHES": { label: "Stop App Switches", desc: "Allows the app to stop app switches." },
    "android.permission.STORAGE_INTERNAL": { label: "Internal Storage", desc: "Allows the app to access internal storage." },
    "android.permission.SUBSCRIBED_FEEDS_READ": { label: "Read Subscribed Feeds", desc: "Allows the app to read subscribed feeds." },
    "android.permission.SUBSCRIBED_FEEDS_WRITE": { label: "Write Subscribed Feeds", desc: "Allows the app to write subscribed feeds." },
    "android.permission.SUBSTITUTE_NOTIFICATION_APP_NAME": { label: "Notification Name Substitution", desc: "Allows the app to substitute the notification app name." },
    "android.permission.TABLET_MODE": { label: "Tablet Mode", desc: "Allows the app to access tablet mode." },
    "android.permission.TEMPORARY_ENABLE_ACCESSIBILITY": { label: "Enable Accessibility", desc: "Allows the app to temporarily enable accessibility features." },
    "android.permission.TETHER_PRIVILEGED": { label: "Tether Privileged", desc: "Allows the app to use privileged tethering features." },
    "android.permission.TRANSMIT_IR": { label: "Infrared", desc: "Allows the app to use the device's infrared transmitter." },
    "android.permission.TRUST_LISTENER": { label: "Trust Listener", desc: "Allows the app to listen for trust events." },
    "android.permission.TV_INPUT_HARDWARE": { label: "TV Input Hardware", desc: "Allows the app to access TV input hardware." },
    "android.permission.TV_VIRTUAL_REMOTE_CONTROLLER": { label: "TV Virtual Remote", desc: "Allows the app to use a virtual TV remote controller." },
    "android.permission.UPDATE_APP_OPS_STATS": { label: "Update App Ops Stats", desc: "Allows the app to update app operation statistics." },
    "android.permission.UPDATE_CONFIG": { label: "Update Config", desc: "Allows the app to update system configuration." },
    "android.permission.UPDATE_DEVICE_STATS": { label: "Update Device Stats", desc: "Allows the app to update device statistics." },
    "android.permission.UPDATE_LOCK": { label: "Update Lock", desc: "Allows the app to update the device lock." },
    "android.permission.UPDATE_LOCK_TASK_PACKAGES": { label: "Lock Task Packages", desc: "Allows the app to update lock task packages." },
    "android.permission.USER_ACTIVITY": { label: "User Activity", desc: "Allows the app to record user activity." },
    "android.permission.USE_CREDENTIALS": { label: "Use Credentials", desc: "Allows the app to request authentication tokens from the AccountManager." },
    "android.permission.WRITE_APN_SETTINGS": { label: "Write APN Settings", desc: "Allows the app to write the apn settings." },
    "android.permission.WRITE_BLOCKED_NUMBERS": { label: "Write Blocked Numbers", desc: "Allows the app to write blocked numbers." },
    "android.permission.WRITE_DREAM_STATE": { label: "Write Dream State", desc: "Allows the app to write the dream state." },
    "android.permission.WRITE_GSERVICES": { label: "Write GServices", desc: "Allows the app to modify the Google services map." },
    "android.permission.WRITE_MEDIA_STORAGE": { label: "Write Media Storage", desc: "Allows the app to write to internal or external media storage." },
    "android.permission.WRITE_PROFILE": { label: "Write User Profile", desc: "Allows the app to write the user's profile information." },
    "android.permission.WRITE_SECURE_SETTINGS": { label: "Write Secure Settings", desc: "Allows the app to read or write the secure system settings." },
    "android.permission.WRITE_SETTINGS": { label: "Write System Settings", desc: "Allows the app to read or write the system settings." },
    "android.permission.WRITE_SMS": { label: "Write SMS", desc: "Allows the app to write SMS messages." },
    "android.permission.WRITE_SOCIAL_STREAM": { label: "Write Social Stream", desc: "Allows the app to write to the user's social stream." },
    "android.permission.WRITE_SYNC_SETTINGS": { label: "Write Sync Settings", desc: "Allows the app to write the sync settings." },
    "android.permission.WRITE_USER_DICTIONARY": { label: "Write User Dictionary", desc: "Allows the app to write to the user dictionary." }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    populateThirdPartyServices();
    updateUI();
    initClickableCards();
});

function initClickableCards() {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.custom-option');
        if (!card) return;

        // Don't toggle if the user clicked directly on the input or label
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') return;

        const input = card.querySelector('input[type="checkbox"], input[type="radio"]');
        if (input) {
            input.checked = !input.checked;
            input.dispatchEvent(new Event('change'));
        }
    });
}

function initTooltips() {
    // Tooltips removed for minimal professional aesthetic
}

function initProgress() {
    const dotsContainer = document.getElementById('progress-dots');
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= state.totalSteps; i++) {
        const dot = document.createElement('div');
        dot.className = 'step-dot';
        dot.id = `dot-${i}`;
        dotsContainer.appendChild(dot);
    }
}

function populateThirdPartyServices(filter = "") {
    const container = document.getElementById('tp-services-grid');
    if (!container) return;
    container.innerHTML = '';

    const filtered = thirdPartyServicesJsonArray.filter(s => 
        s.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        container.innerHTML = '<div class="text-center py-5 w-100 opacity-50 small">No services found.</div>';
        return;
    }

    filtered.forEach(service => {
        const item = document.createElement('div');
        item.innerHTML = `
            <input type="checkbox" class="btn-check" id="tp-${service.name.replace(/\s+/g, '')}" autocomplete="off" ${service.enabled ? 'checked' : ''} onchange="toggleService('${service.name}', this.checked)">
            <label class="custom-option tp-card h-100" for="tp-${service.name.replace(/\s+/g, '')}">
                <img src="${service.logo}" alt="${service.name}">
                <span class="small fw-600" style="font-size: 0.75rem;">${service.name}</span>
            </label>
        `;
        container.appendChild(item.firstElementChild);
        container.appendChild(item.lastElementChild);
    });
    updateSelectedCount();
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function filterThirdPartyServices(query) {
    populateThirdPartyServices(query);
}

function toggleService(name, enabled) {
    const service = thirdPartyServicesJsonArray.find(s => s.name === name);
    if (service) service.enabled = enabled;
    updateSelectedCount();
}

function updateSelectedCount() {
    const count = thirdPartyServicesJsonArray.filter(s => s.enabled).length;
    const badge = document.getElementById('selected-count-badge');
    if (badge) badge.innerText = `${count} Selected`;
}

function updateData(key, value) {
    state[key] = value;
    
    // Auto-sync Location Tracking with Data Safety
    if (key === 'isLocationTracked') {
        state.dataCollectionDetails.location = value;
        const locDs = document.getElementById('ds-loc');
        if (locDs) locDs.checked = value;
    }
}

function updateDS(key, value) {
    state.dataCollectionDetails[key] = value;
    
    // Auto-sync Location Data Safety with Tracking Switch
    if (key === 'location') {
        state.isLocationTracked = value;
        const locSw = document.getElementById('isLocationTracked');
        if (locSw) locSw.checked = value;
    }
}

function updatePersonalData(key, value) {
    state.personalDataPoints[key] = value;
    
    // Auto-check Personal Info in Data Safety if any personal data is selected
    const anyPersonal = Object.values(state.personalDataPoints).some(v => v);
    if (anyPersonal) {
        state.dataCollectionDetails.personalInfo = true;
        const perDs = document.getElementById('ds-per');
        if (perDs) perDs.checked = true;
    }
}

function updatePolicyType(val) {
    state.typeOfPolicyInt = parseInt(val);
}

function handlePermissionInput(val) {
    state.permissionsXml = val;
    parsePermissions(val);
    renderDetectedPermissions();
}

function parsePermissions(text) {
    const regex = /android:name="([^"]+)"/g;
    let match;
    const detected = [];
    while ((match = regex.exec(text)) !== null) {
        const perm = match[1];
        if (androidPermissionMap[perm] && !detected.find(d => d.key === perm)) {
            detected.push({
                key: perm,
                ...androidPermissionMap[perm]
            });
        }
    }
    state.detectedPermissions = detected;
    
    // Auto-update Transparency State (Case-Insensitive)
    const permKeys = detected.map(d => d.key.toUpperCase());
    
    if (permKeys.some(k => k.includes("LOCATION"))) {
        state.isLocationTracked = true;
        state.dataCollectionDetails.location = true;
    }
    if (permKeys.some(k => k.includes("CONTACTS") || k.includes("GET_ACCOUNTS"))) {
        state.dataCollectionDetails.contacts = true;
    }
    if (permKeys.some(k => k.includes("STORAGE") || k.includes("MEDIA") || k.includes("CAMERA") || k.includes("AUDIO"))) {
        state.dataCollectionDetails.photosVideos = true;
    }
    if (permKeys.some(k => k.includes("PHONE") || k.includes("SMS") || k.includes("CALL_LOG") || k.includes("QUERY_ALL_PACKAGES") || k.includes("AD_ID"))) {
        state.dataCollectionDetails.deviceIds = true;
    }
    if (permKeys.some(k => k.includes("BILLING") || k.includes("CALENDAR"))) {
        // Financial or sensitive info
        if (permKeys.some(k => k.includes("BILLING"))) state.dataCollectionDetails.financialInfo = true;
        if (permKeys.some(k => k.includes("CALENDAR"))) state.dataCollectionDetails.personalInfo = true;
    }
}

function renderDetectedPermissions() {
    const container = document.getElementById('detected-permissions-grid');
    if (!container) return;
    container.innerHTML = '';
    
    if (state.detectedPermissions.length === 0) {
        container.innerHTML = '<div class="text-center py-4 w-100 opacity-50 small">No recognizable permissions detected.</div>';
        return;
    }

    state.detectedPermissions.forEach(perm => {
        const item = document.createElement('div');
        item.className = 'custom-option p-2 mb-2 d-flex align-items-start gap-2';
        item.style.cursor = 'default';
        item.innerHTML = `
            <i data-lucide="shield-check" class="text-primary mt-1" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
            <div>
                <div class="fw-bold small">${perm.label}</div>
                <div class="text-dim" style="font-size: 0.7rem;">${perm.desc}</div>
            </div>
        `;
        container.appendChild(item);
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function nextStep() {
    if (validateCurrentStep()) {
        if (state.wizardStep < state.totalSteps) {
            state.wizardStep++;
            updateUI();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function validateCurrentStep() {
    if (state.wizardStep === 2) {
        const isAppNameValid = state.appName.trim() !== "" && state.appName !== "[App Name]";
        const isDevNameValid = state.devName.trim() !== "" && state.devName !== "[Developer Name]";
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.appContact);
        
        if (!isAppNameValid) { showToast("App Name is required", "error"); return false; }
        if (!isEmailValid) { showToast("Valid contact email is required", "error"); return false; }
        if (!isDevNameValid) { showToast("Developer Name is required", "error"); return false; }
    }
    return true;
}

function prevStep() {
    if (state.wizardStep > 1) {
        state.wizardStep--;
        updateUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateUI() {
    // Update steps visibility
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
    const currentStepEl = document.getElementById(`step-${state.wizardStep}`);
    if (currentStepEl) currentStepEl.classList.add('active');
    
    // Always sync transparency UI if it's visible or about to be
    if (state.wizardStep === 5) {
        syncTransparencyUI();
    }
    
    // Update progress
    const progress = (state.wizardStep / state.totalSteps) * 100;
    document.getElementById('progress-bar-fill').style.width = `${progress}%`;
    document.getElementById('step-counter').innerText = `Step ${state.wizardStep} / ${state.totalSteps}`;
    
    // Update dots
    for (let i = 1; i <= state.totalSteps; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (!dot) continue;
        dot.classList.remove('active', 'completed');
        if (i === state.wizardStep) dot.classList.add('active');
        else if (i < state.wizardStep) dot.classList.add('completed');
    }
    
    // Navigation elements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const spacer = document.getElementById('footer-spacer');
    
    if (state.wizardStep === 1) {
        prevBtn.style.display = 'none';
        spacer.style.display = 'block';
    } else if (state.wizardStep === state.totalSteps) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'none';
        spacer.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        spacer.style.display = 'none';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function generatePolicy(type) {
    const title = type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions';
    document.getElementById('modalTitle').innerText = title;
    
    const content = type === 'privacy' ? getPrivacyContent() : getTncContent();
    const rawHtml = getRawHTML(content, title);
    const markdown = toMarkdown(rawHtml);
    
    document.getElementById('policy-preview').innerHTML = content;
    document.getElementById('policy-html').value = rawHtml;
    document.getElementById('policy-md').value = markdown;
    
    const modal = new bootstrap.Modal(document.getElementById('policyModal'));
    modal.show();
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function getPrivacyContent() {
    const devName = state.devName || "[Developer Name]";
    const appName = state.appName || "[App Name]";
    const email = state.appContact || "[Contact Email]";
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(state.effectiveFromDate).toLocaleDateString('en-US', dateOptions);
    
    const enabledServices = thirdPartyServicesJsonArray.filter(s => s.enabled);
    const servicesList = enabledServices.length > 0 ? 
        `<ul>${enabledServices.map(s => `<li><a href="${s.link.privacy}" target="_blank" rel="noopener noreferrer">${s.name}</a></li>`).join('')}</ul>` : 
        '<p>None.</p>';

    const dsItems = Object.entries(state.dataCollectionDetails)
        .filter(([_, v]) => v)
        .map(([k, _]) => `<li>${k.replace(/([A-Z])/g, ' $1').toLowerCase()}</li>`)
        .join('');

    const permissionItems = state.detectedPermissions.map(p => `<li><strong>${p.label}:</strong> ${p.desc}</li>`).join('');

    return `
        <h1 style="text-align: center;">Privacy Policy</h1>
        <p>Last updated: ${date}</p>
        <p>This privacy policy applies to the ${appName} app (hereby referred to as "Application") for mobile devices that was created by ${devName} (hereby referred to as "Service Provider") as a ${state.typeOfApp} service. This service is intended for use "AS IS".</p>
        
        <h3>Information Collection and Use</h3>
        <p>The Application collects information when you download and use it. This information may include information such as:</p>
        <ul>
            <li>Your device's Internet Protocol address (e.g. IP address)</li>
            <li>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
            <li>The time spent on the Application</li>
            <li>The operating system you use on your mobile device</li>
        </ul>
        ${(() => {
            const selected = Object.entries(state.personalDataPoints)
                .filter(([_, v]) => v)
                .map(([k, _]) => k.replace(/([A-Z])/g, ' $1').toLowerCase());
            
            if (state.pidInfoIn) selected.push(state.pidInfoIn);
            
            if (selected.length > 0) {
                return `<p>The Application collects the following personally identifiable information: <strong>${selected.join(', ')}</strong>.</p>`;
            }
            return '';
        })()}
        
        ${state.isLocationTracked ? `<p><strong>Location Tracking:</strong> The Application collects real-time information about the location of your device to provide location-based services.</p>` : ''}
        
        ${permissionItems ? `
        <h3>Hardware and System Permissions</h3>
        <p>To provide its services, the Application requires access to certain hardware and system features on your device. Below is a detailed list of the permissions requested and their purpose:</p>
        <ul>${permissionItems}</ul>
        ` : ''}

        ${state.isAIUsed ? `<h3>AI Transparency</h3><p>The Application utilizes artificial intelligence (AI) and machine learning technologies to enhance user features. We ensure transparency in how AI models process your data. If you encounter any biased or harmful content generated by AI, please report it to ${email}.</p>` : ''}

        <h3>Third Party Access</h3>
        <p>Only aggregated, anonymized data is periodically transmitted to external services to help the Service Provider improve the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.</p>
        <p>Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:</p>
        ${servicesList}

        <h3>Account and Data Deletion</h3>
        <p>In accordance with 2026 Google Play policies, the Application provides a path for users to request account and data deletion.</p>
        ${state.accountDeletionUrl ? `<p>Users can request deletion of their account and associated data through our public web link: <a href="${state.accountDeletionUrl}" target="_blank">${state.accountDeletionUrl}</a></p>` : ''}
        ${state.accountDeletionInstructions ? `<p><strong>In-App Instructions:</strong> ${state.accountDeletionInstructions}</p>` : ''}
        ${(!state.accountDeletionUrl && !state.accountDeletionInstructions) ? `<p>Please contact the Service Provider at ${email} to request account or data deletion.</p>` : ''}

        <h3>Data Safety</h3>
        <p>The Service Provider is committed to safeguarding the confidentiality of your information. The Application collects the following categories of data in compliance with Data Safety standards:</p>
        <ul>${dsItems || '<li>No specific data categories selected for collection.</li>'}</ul>

        <h3>Children's Privacy</h3>
        ${state.isTargetingChildren ? 
            `<p>The Service Provider complies with COPPA (Children's Online Privacy Protection Act) and GDPR-K. We do not knowingly collect personal information from children under 13 without verifiable parental consent.</p>` : 
            `<p>The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13. If a parent or guardian becomes aware that his or her child has provided us with information without their consent, he or she should contact us at ${email}.</p>`
        }

        <h3>Contact Us</h3>
        <p>If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at ${email}.</p>
        <hr>
        <p style="font-size: 0.8rem; opacity: 0.7;">This privacy policy was generated by the 2026 Edition of App Privacy Policy Generator.</p>
    `;
}

function getTncContent() {
    const devName = state.devName || "[Developer Name]";
    const appName = state.appName || "[App Name]";
    const email = state.appContact || "[Contact Email]";
    
    return `
        <h1 style="text-align: center;">Terms & Conditions</h1>
        <p>These terms and conditions apply to the ${appName} app (hereby referred to as "Application") for mobile devices as a ${state.typeOfApp} service. This service is intended for use "AS IS".</p>
        <p>By downloading or using the Application, you are automatically agreeing to these terms. You should make sure therefore that you read them carefully before using the Application.</p>
        
        <h3>Restrictions</h3>
        <p>You are not allowed to copy, or modify the Application, any part of the Application, or our trademarks in any way. You are not allowed to attempt to extract the source code of the Application, and you also shouldn't try to translate the Application into other languages, or make derivative versions.</p>
        
        <h3>Changes to These Terms and Conditions</h3>
        <p>The Service Provider may update their Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.</p>
        
        <h3>Contact Us</h3>
        <p>If you have any questions or suggestions about the Terms and Conditions, do not hesitate to contact the Service Provider at ${email}.</p>
        <hr>
        <p style="font-size: 0.8rem; opacity: 0.7;">These terms were generated by the 2026 Edition of App Privacy Policy Generator.</p>
    `;
}

function getRawHTML(content, title) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width'>
  <title>${title}</title>
  <style> 
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 2em; line-height: 1.5; color: #333; max-width: 800px; margin: 0 auto; }
    h1, h2, h3 { color: #111; }
    ul { padding-left: 1.5em; }
    li { margin-bottom: 0.5em; }
    a { color: #6366f1; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
${content}
</body>
</html>`;
}

function downloadPolicy(format) {
    const title = document.getElementById('modalTitle').innerText;
    let content = "";
    let filename = title.replace(/\s+/g, '_').toLowerCase();
    
    if (format === 'html') {
        content = document.getElementById('policy-html').value;
        filename += ".html";
    } else {
        content = document.getElementById('policy-md').value;
        filename += ".md";
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function copyContent() {
    const activeTab = document.querySelector('#policyTabs .nav-link.active').id;
    let content = "";
    if (activeTab === 'tab-preview') content = document.getElementById('policy-preview').innerText;
    else if (activeTab === 'tab-html') content = document.getElementById('policy-html').value;
    else if (activeTab === 'tab-md') content = document.getElementById('policy-md').value;
    
    navigator.clipboard.writeText(content).then(() => {
        showToast("Content copied to clipboard!");
    });
}

function syncTransparencyUI() {
    const mappings = {
        'isLocationTracked': state.isLocationTracked,
        'isAIUsed': state.isAIUsed,
        'isTargetingChildren': state.isTargetingChildren,
        'ds-loc': state.dataCollectionDetails.location,
        'ds-per': state.dataCollectionDetails.personalInfo,
        'ds-fin': state.dataCollectionDetails.financialInfo,
        'ds-con': state.dataCollectionDetails.contacts,
        'ds-pho': state.dataCollectionDetails.photosVideos,
        'ds-dev': state.dataCollectionDetails.deviceIds,
        'pid-name': state.personalDataPoints.name,
        'pid-email': state.personalDataPoints.email,
        'pid-phone': state.personalDataPoints.phone,
        'pid-address': state.personalDataPoints.address,
        'pid-device': state.personalDataPoints.deviceId,
        'pid-ip': state.personalDataPoints.ipAddress
    };
    
    Object.entries(mappings).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.checked = val;
    });
}

function showToast(message, type = "success") {
    const toastEl = document.getElementById('copyToast');
    const toastBody = toastEl.querySelector('.toast-body');
    const icon = type === "success" ? 'check-circle' : 'alert-triangle';
    const iconClass = type === "success" ? 'text-success' : 'text-danger';
    
    toastBody.innerHTML = `<i data-lucide="${icon}" class="${iconClass} me-2" style="width: 18px; height: 18px;"></i> ${message}`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
