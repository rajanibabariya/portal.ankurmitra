// ─── MOBILE APP SETTINGS CONTROLLER & LIVE REAL-TIME PREVIEW ───────────────
    let currentSelectedMobileColor = '#0B6623';
    let currentMobileDevice = 'iphone';
    let currentMobilePreviewLang = 'gu';
    let currentMockupViewMode = 'sim';

    const MOBILE_MODULE_DEFINITIONS = [
      { id: 'AiMitra', checkId: 'cfgMod_AiMitra', labelId: 'cfgModLabel_AiMitra', cardId: 'phoneCard_AiMitra', phoneLabelId: 'phoneModLabel_AiMitra', defLabel: 'AI મિત્ર' },
      { id: 'CropDoctor', checkId: 'cfgMod_CropDoctor', labelId: 'cfgModLabel_CropDoctor', cardId: 'phoneCard_CropDoctor', phoneLabelId: 'phoneModLabel_CropDoctor', defLabel: 'પાક ડોક્ટર' },
      { id: 'Mandi', checkId: 'cfgMod_Mandi', labelId: 'cfgModLabel_Mandi', cardId: 'phoneCard_Mandi', phoneLabelId: 'phoneModLabel_Mandi', defLabel: 'મંડી ભાવ' },
      { id: 'Weather', checkId: 'cfgMod_Weather', labelId: 'cfgModLabel_Weather', cardId: 'phoneCard_Weather', phoneLabelId: 'phoneModLabel_Weather', defLabel: 'હવામાન' },
      { id: 'CropGuide', checkId: 'cfgMod_CropGuide', labelId: 'cfgModLabel_CropGuide', cardId: 'phoneCard_CropGuide', phoneLabelId: 'phoneModLabel_CropGuide', defLabel: 'પાક માર્ગદર્શિકા' },
      { id: 'FarmerMart', checkId: 'cfgMod_FarmerMart', labelId: 'cfgModLabel_FarmerMart', cardId: 'phoneCard_FarmerMart', phoneLabelId: 'phoneModLabel_FarmerMart', defLabel: 'ખેડૂત માર્ટ' },
      { id: 'ToolRental', checkId: 'cfgMod_ToolRental', labelId: 'cfgModLabel_ToolRental', cardId: 'phoneCard_ToolRental', phoneLabelId: 'phoneModLabel_ToolRental', defLabel: 'સાધન ભાડે' },
      { id: 'More', checkId: 'cfgMod_More', labelId: 'cfgModLabel_More', cardId: 'phoneCard_More', phoneLabelId: 'phoneModLabel_More', defLabel: 'વધુ' }
    ];

    function initMobileAppSettings() {
      try {
        const savedRaw = localStorage.getItem('ankurmitra_mobile_config') || localStorage.getItem('ankurmitra_mobile_app_config');
        if (savedRaw) {
          const cfg = JSON.parse(savedRaw);
          if (cfg.brandColor) selectMobileColorSwatch(cfg.brandColor, '', false);
          if (cfg.appNameEn && document.getElementById('cfgMobileAppNameEn')) document.getElementById('cfgMobileAppNameEn').value = cfg.appNameEn;
          if (cfg.appNameGu && document.getElementById('cfgMobileAppNameGu')) document.getElementById('cfgMobileAppNameGu').value = cfg.appNameGu;
          if (cfg.appTagline && document.getElementById('cfgMobileAppTagline')) document.getElementById('cfgMobileAppTagline').value = cfg.appTagline;
          
          if (cfg.farmerName && document.getElementById('cfgMobileFarmerName')) document.getElementById('cfgMobileFarmerName').value = cfg.farmerName;
          if (cfg.farmerLocation && document.getElementById('cfgMobileFarmerLocation')) document.getElementById('cfgMobileFarmerLocation').value = cfg.farmerLocation;
          if (cfg.greetingFormat && document.getElementById('cfgMobileGreetingFormat')) document.getElementById('cfgMobileGreetingFormat').value = cfg.greetingFormat;
          if (cfg.alertCount !== undefined && document.getElementById('cfgMobileAlertCount')) document.getElementById('cfgMobileAlertCount').value = cfg.alertCount;
          if (cfg.farmerAvatar && document.getElementById('cfgMobileFarmerAvatar')) document.getElementById('cfgMobileFarmerAvatar').value = cfg.farmerAvatar;
          if (cfg.headerBg && document.getElementById('cfgMobileHeaderBg')) document.getElementById('cfgMobileHeaderBg').value = cfg.headerBg;

          if (typeof cfg.bannerVisible === 'boolean' && document.getElementById('cfgMobileBannerVisible')) document.getElementById('cfgMobileBannerVisible').checked = cfg.bannerVisible;
          if (cfg.bannerTitle && document.getElementById('cfgMobileBannerTitle')) document.getElementById('cfgMobileBannerTitle').value = cfg.bannerTitle;
          if (cfg.bannerSubtitle && document.getElementById('cfgMobileBannerSubtitle')) document.getElementById('cfgMobileBannerSubtitle').value = cfg.bannerSubtitle;
          if (cfg.bannerTag && document.getElementById('cfgMobileBannerTag')) document.getElementById('cfgMobileBannerTag').value = cfg.bannerTag;
          if (cfg.bannerCta && document.getElementById('cfgMobileBannerCta')) document.getElementById('cfgMobileBannerCta').value = cfg.bannerCta;
          if (cfg.bannerTheme && document.getElementById('cfgMobileBannerTheme')) document.getElementById('cfgMobileBannerTheme').value = cfg.bannerTheme;
          if (cfg.bannerSlide && document.getElementById('cfgMobileBannerSlide')) document.getElementById('cfgMobileBannerSlide').value = cfg.bannerSlide;

          if (cfg.homeLayout && document.getElementById('cfgMobileHomeLayoutMode')) document.getElementById('cfgMobileHomeLayoutMode').value = cfg.homeLayout;
          
          if (cfg.modules && typeof cfg.modules === 'object') {
            MOBILE_MODULE_DEFINITIONS.forEach(mod => {
              if (cfg.modules[mod.id] !== undefined) {
                const el = document.getElementById(mod.checkId);
                if (el) el.checked = !!cfg.modules[mod.id];
              }
              if (cfg.moduleLabels && cfg.moduleLabels[mod.id]) {
                const lblEl = document.getElementById(mod.labelId);
                if (lblEl) lblEl.value = cfg.moduleLabels[mod.id];
              }
            });
          }

          if (cfg.weatherTemp && document.getElementById('cfgMobileWeatherTemp')) document.getElementById('cfgMobileWeatherTemp').value = cfg.weatherTemp;
          if (cfg.weatherCond && document.getElementById('cfgMobileWeatherCondition')) document.getElementById('cfgMobileWeatherCondition').value = cfg.weatherCond;
          if (cfg.rainProb && document.getElementById('cfgMobileRainProb')) document.getElementById('cfgMobileRainProb').value = cfg.rainProb;
          if (cfg.humidity && document.getElementById('cfgMobileHumidity')) document.getElementById('cfgMobileHumidity').value = cfg.humidity;
          if (cfg.windSpeed && document.getElementById('cfgMobileWindSpeed')) document.getElementById('cfgMobileWindSpeed').value = cfg.windSpeed;

          if (cfg.mandiCrop && document.getElementById('cfgMobileMandiCrop')) document.getElementById('cfgMobileMandiCrop').value = cfg.mandiCrop;
          if (cfg.mandiRate && document.getElementById('cfgMobileMandiRate')) document.getElementById('cfgMobileMandiRate').value = cfg.mandiRate;
          if (cfg.mandiUnit && document.getElementById('cfgMobileMandiUnit')) document.getElementById('cfgMobileMandiUnit').value = cfg.mandiUnit;
          if (cfg.mandiDelta && document.getElementById('cfgMobileMandiDelta')) document.getElementById('cfgMobileMandiDelta').value = cfg.mandiDelta;

          if (cfg.adv1Title && document.getElementById('cfgMobileAdv1Title')) document.getElementById('cfgMobileAdv1Title').value = cfg.adv1Title;
          if (cfg.adv1Sub && document.getElementById('cfgMobileAdv1Sub')) document.getElementById('cfgMobileAdv1Sub').value = cfg.adv1Sub;
          if (cfg.adv2Title && document.getElementById('cfgMobileAdv2Title')) document.getElementById('cfgMobileAdv2Title').value = cfg.adv2Title;
          if (cfg.adv2Sub && document.getElementById('cfgMobileAdv2Sub')) document.getElementById('cfgMobileAdv2Sub').value = cfg.adv2Sub;

          if (cfg.tab1 && document.getElementById('cfgMobileTab1')) document.getElementById('cfgMobileTab1').value = cfg.tab1;
          if (cfg.tab2 && document.getElementById('cfgMobileTab2')) document.getElementById('cfgMobileTab2').value = cfg.tab2;
          if (cfg.tab3 && document.getElementById('cfgMobileTab3')) document.getElementById('cfgMobileTab3').value = cfg.tab3;
          if (cfg.tab4 && document.getElementById('cfgMobileTab4')) document.getElementById('cfgMobileTab4').value = cfg.tab4;
          if (cfg.tab5 && document.getElementById('cfgMobileTab5')) document.getElementById('cfgMobileTab5').value = cfg.tab5;
          if (cfg.activeTab && document.getElementById('cfgMobileActiveTab')) document.getElementById('cfgMobileActiveTab').value = cfg.activeTab;

          if (typeof cfg.maintenance === 'boolean' && document.getElementById('cfgMobileMaintenanceToggle')) document.getElementById('cfgMobileMaintenanceToggle').checked = cfg.maintenance;
          if (cfg.maintenanceMsg && document.getElementById('cfgMobileMaintenanceMsg')) document.getElementById('cfgMobileMaintenanceMsg').value = cfg.maintenanceMsg;
        }
      } catch (err) {
        console.warn('initMobileAppSettings error:', err);
      }

      updateMobileAppPreview();
    }
    window.initMobileAppSettings = initMobileAppSettings;

    function switchMobileSettingsTab(tabKey) {
      document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.classList.remove('bg-[#0B6623]', 'text-white', 'shadow-xs');
        btn.classList.add('text-[#64748B]', 'hover:text-[#0F172A]', 'hover:bg-slate-50', 'dark:hover:bg-slate-800');
      });

      const activeBtn = document.getElementById(`tabBtn-mobile-${tabKey}`);
      if (activeBtn) {
        activeBtn.classList.remove('text-[#64748B]', 'hover:text-[#0F172A]', 'hover:bg-slate-50', 'dark:hover:bg-slate-800');
        activeBtn.classList.add('bg-[#0B6623]', 'text-white', 'shadow-xs');
      }

      document.querySelectorAll('.mobile-tab-pane').forEach(pane => pane.classList.add('hidden'));
      const activePane = document.getElementById(`tabPane-mobile-${tabKey}`);
      if (activePane) activePane.classList.remove('hidden');
    }
    window.switchMobileSettingsTab = switchMobileSettingsTab;

    function selectMobileColorSwatch(hexColor, name, triggerPreview) {
      currentSelectedMobileColor = hexColor;

      document.querySelectorAll('.mobile-color-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-offset-2', 'ring-slate-900', 'ring-[#0B6623]');
        btn.innerText = '';
      });

      const clickedBtn = Array.from(document.querySelectorAll('.mobile-color-btn')).find(b => {
        const bg = b.getAttribute('onclick') || '';
        return bg.includes(hexColor);
      });

      if (clickedBtn) {
        clickedBtn.classList.add('ring-2', 'ring-offset-2', 'ring-[#0B6623]');
        clickedBtn.innerText = '✓';
      }

      if (triggerPreview !== false) {
        updateMobileAppPreview();
      }
    }
    window.selectMobileColorSwatch = selectMobileColorSwatch;

    function setMockupViewMode(mode) {
      currentMockupViewMode = mode;
      const btnSim = document.getElementById('btnMockupModeSim');
      const btnImg = document.getElementById('btnMockupModeImg');
      const overlay = document.getElementById('phoneScreenshotOverlay');

      if (mode === 'img') {
        if (overlay) overlay.classList.remove('hidden');
        if (btnImg) {
          btnImg.classList.add('bg-[#0B6623]', 'text-white', 'shadow-xs');
          btnImg.classList.remove('text-[#64748B]');
        }
        if (btnSim) {
          btnSim.classList.remove('bg-[#0B6623]', 'text-white', 'shadow-xs');
          btnSim.classList.add('text-[#64748B]');
        }
      } else {
        if (overlay) overlay.classList.add('hidden');
        if (btnSim) {
          btnSim.classList.add('bg-[#0B6623]', 'text-white', 'shadow-xs');
          btnSim.classList.remove('text-[#64748B]');
        }
        if (btnImg) {
          btnImg.classList.remove('bg-[#0B6623]', 'text-white', 'shadow-xs');
          btnImg.classList.add('text-[#64748B]');
        }
      }
    }
    window.setMockupViewMode = setMockupViewMode;

    function setMobileDeviceFrame(device) {
      currentMobileDevice = device;
      const frame = document.getElementById('phoneHardwareFrame');
      const screen = document.getElementById('phoneScreen');
      const island = document.getElementById('phoneDynamicIsland');
      if (!frame || !screen) return;

      if (device === 'pixel') {
        frame.className = 'relative w-full max-w-[365px] rounded-[40px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-black shadow-2xl border-4 border-slate-600 ring-1 ring-white/10 select-none transition-all duration-300';
        screen.className = 'relative w-full h-[690px] rounded-[30px] bg-[#F8FAFC] dark:bg-slate-900 overflow-hidden flex flex-col text-[#0F172A] dark:text-white font-sans transition-colors duration-200';
        if (island) island.className = 'w-4 h-4 bg-black rounded-full flex items-center justify-center';
      } else if (device === 'clean') {
        frame.className = 'relative w-full max-w-[365px] rounded-[24px] p-1.5 bg-slate-200 dark:bg-slate-800 shadow-xl border border-slate-300 select-none transition-all duration-300';
        screen.className = 'relative w-full h-[690px] rounded-[20px] bg-[#F8FAFC] dark:bg-slate-900 overflow-hidden flex flex-col text-[#0F172A] dark:text-white font-sans transition-colors duration-200';
        if (island) island.className = 'hidden';
      } else {
        // iPhone standard
        frame.className = 'relative w-full max-w-[365px] rounded-[48px] p-3.5 bg-gradient-to-b from-slate-800 via-slate-900 to-black shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10 select-none transition-all duration-300';
        screen.className = 'relative w-full h-[690px] rounded-[38px] bg-[#F8FAFC] dark:bg-slate-900 overflow-hidden flex flex-col text-[#0F172A] dark:text-white font-sans transition-colors duration-200';
        if (island) island.className = 'w-20 h-4 bg-black rounded-full flex items-center justify-between px-2 text-[8px] text-white shadow-xs';
      }
    }
    window.setMobileDeviceFrame = setMobileDeviceFrame;

    function setMobilePreviewLanguage(lang) {
      currentMobilePreviewLang = lang;
      updateMobileAppPreview();
    }
    window.setMobilePreviewLanguage = setMobilePreviewLanguage;

    function setMobileActiveTabPreview(tabKey) {
      const tabs = ['home', 'farm', 'mart', 'community', 'profile'];
      tabs.forEach(t => {
        const btn = document.getElementById(`phoneTabBtn-${t}`);
        if (btn) {
          if (t === tabKey) {
            btn.className = 'flex flex-col items-center justify-center px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#0B6623] transition';
          } else {
            btn.className = 'flex flex-col items-center justify-center px-2 py-1 text-slate-500 hover:text-slate-800 transition';
          }
        }
      });

      const selectEl = document.getElementById('cfgMobileActiveTab');
      if (selectEl) selectEl.value = tabKey;
    }
    window.setMobileActiveTabPreview = setMobileActiveTabPreview;

    function updateMobileAppPreview() {
      // 1. Branding & Header Text
      const appNameGu = document.getElementById('cfgMobileAppNameGu')?.value || 'અંકુરમિત્ર';
      const appNameEn = document.getElementById('cfgMobileAppNameEn')?.value || 'ANKURMITRA';
      const appTagline = document.getElementById('cfgMobileAppTagline')?.value || 'વિકાસ માટે સ્માર્ટ સાથી';
      
      const phoneBrandTitle = document.getElementById('phoneBrandTitle');
      if (phoneBrandTitle) phoneBrandTitle.innerText = (currentMobilePreviewLang === 'en' ? appNameEn : 'ANKURMITRA');

      const phoneBrandTagline = document.getElementById('phoneBrandTagline');
      if (phoneBrandTagline) phoneBrandTagline.innerText = appTagline;

      // 2. Farmer Profile & Location
      const farmerName = document.getElementById('cfgMobileFarmerName')?.value || 'જયેશ પટેલ';
      const farmerLocation = document.getElementById('cfgMobileFarmerLocation')?.value || 'સુડાવડ, અમરેલી';
      const alertCount = document.getElementById('cfgMobileAlertCount')?.value || '2';
      const greetingFormat = document.getElementById('cfgMobileGreetingFormat')?.value || 'shubh_savaar';

      const phoneFarmerName = document.getElementById('phoneFarmerName');
      if (phoneFarmerName) phoneFarmerName.innerText = farmerName;

      const phoneLocationText = document.getElementById('phoneLocationText');
      if (phoneLocationText) phoneLocationText.innerText = farmerLocation;

      const phoneFarmerLocationSub = document.getElementById('phoneFarmerLocationSub');
      if (phoneFarmerLocationSub) phoneFarmerLocationSub.innerText = farmerLocation;

      const phoneBadgeCount = document.getElementById('phoneBadgeCount');
      if (phoneBadgeCount) {
        phoneBadgeCount.innerText = alertCount;
        phoneBadgeCount.style.display = (parseInt(alertCount, 10) > 0 ? 'flex' : 'none');
      }

      const phoneGreeting = document.getElementById('phoneHeaderGreeting');
      if (phoneGreeting) {
        if (greetingFormat === 'namaste') {
          phoneGreeting.innerText = (currentMobilePreviewLang === 'en' ? 'Namaste' : 'નમસ્તે');
        } else if (greetingFormat === 'jay_shree_krishna') {
          phoneGreeting.innerText = (currentMobilePreviewLang === 'en' ? 'Jai Shree Krishna' : 'જય શ્રી કૃષ્ણ');
        } else if (greetingFormat === 'jay_jawan') {
          phoneGreeting.innerText = (currentMobilePreviewLang === 'en' ? 'Jai Jawan Jai Kisan' : 'જય જવાન જય કિસાન');
        } else if (greetingFormat === 'ram_ram') {
          phoneGreeting.innerText = (currentMobilePreviewLang === 'en' ? 'Ram Ram' : 'રામ રામ');
        } else {
          phoneGreeting.innerText = (currentMobilePreviewLang === 'en' ? 'Good Morning' : 'શુભ સવાર');
        }
      }

      // Farmer Avatar
      const avatarSelect = document.getElementById('cfgMobileFarmerAvatar')?.value || 'jayesh';
      const avatarImg = document.getElementById('phoneFarmerAvatarImg');
      if (avatarImg) {
        if (avatarSelect === 'ramesh') {
          avatarImg.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=160&auto=format&fit=crop&q=80';
        } else if (avatarSelect === 'bharat') {
          avatarImg.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80';
        } else {
          avatarImg.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80';
        }
      }

      // Farmer Header Card Background
      const headerBg = document.getElementById('cfgMobileHeaderBg')?.value || 'amreli_green';
      const farmerHeaderCard = document.getElementById('phoneFarmerHeaderCard');
      if (farmerHeaderCard) {
        if (headerBg === 'sunrise') {
          farmerHeaderCard.style.background = 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 50%, #ECFDF5 100%)';
        } else if (headerBg === 'cotton') {
          farmerHeaderCard.style.background = 'linear-gradient(135deg, #F0FDF4 0%, #E0F2FE 50%, #F8FAFC 100%)';
        } else {
          farmerHeaderCard.style.background = 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 50%, #E0F2F1 100%)';
        }
      }

      // 3. Hero Carousel Banner
      const bannerVisible = document.getElementById('cfgMobileBannerVisible')?.checked !== false;
      const bannerContainer = document.getElementById('phoneHeroBannerContainer');
      if (bannerContainer) {
        bannerContainer.style.display = bannerVisible ? 'flex' : 'none';
      }

      const bannerTag = document.getElementById('cfgMobileBannerTag')?.value || '🔆 ડ્રોન';
      const bannerTitle = document.getElementById('cfgMobileBannerTitle')?.value || 'ડ્રોન છંટકાવ';
      const bannerSubtitle = document.getElementById('cfgMobileBannerSubtitle')?.value || 'સુડાવડમાં આજે ઉપલબ્ધ · 4 એકર';
      const bannerCta = document.getElementById('cfgMobileBannerCta')?.value || 'બુક કરો ➔';
      const bannerTheme = document.getElementById('cfgMobileBannerTheme')?.value || 'drone';
      const bannerSlide = document.getElementById('cfgMobileBannerSlide')?.value || '1';

      const phoneBannerTag = document.getElementById('phoneBannerTag');
      if (phoneBannerTag) phoneBannerTag.innerText = bannerTag;

      const phoneBannerTitle = document.getElementById('phoneBannerTitle');
      if (phoneBannerTitle) phoneBannerTitle.innerText = bannerTitle;

      const phoneBannerSubtitle = document.getElementById('phoneBannerSubtitle');
      if (phoneBannerSubtitle) phoneBannerSubtitle.innerText = bannerSubtitle;

      const phoneBannerCta = document.getElementById('phoneBannerCta');
      if (phoneBannerCta) phoneBannerCta.innerHTML = `<span>${bannerCta}</span>`;

      if (bannerContainer) {
        let bgImg = 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80';
        if (bannerTheme === 'crop_scan') {
          bgImg = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80';
        } else if (bannerTheme === 'tractor') {
          bgImg = 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop&q=80';
        } else if (bannerTheme === 'solar') {
          bgImg = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80';
        }
        bannerContainer.style.background = `linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 60%, rgba(0,0,0,0.1) 100%), url('${bgImg}') center/cover no-repeat`;
      }

      const phoneBannerDots = document.getElementById('phoneBannerDots');
      if (phoneBannerDots) {
        if (bannerSlide === '2') {
          phoneBannerDots.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span class="w-2 h-2 rounded-full bg-slate-900"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>';
        } else if (bannerSlide === '3') {
          phoneBannerDots.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span class="w-2 h-2 rounded-full bg-slate-900"></span>';
        } else {
          phoneBannerDots.innerHTML = '<span class="w-2 h-2 rounded-full bg-slate-900"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>';
        }
      }

      // 4. 8 Quick Action Modules
      MOBILE_MODULE_DEFINITIONS.forEach(mod => {
        const checkEl = document.getElementById(mod.checkId);
        const cardEl = document.getElementById(mod.cardId);
        const labelEl = document.getElementById(mod.labelId);
        const phoneLabelEl = document.getElementById(mod.phoneLabelId);

        if (cardEl && checkEl) {
          cardEl.style.display = checkEl.checked ? 'flex' : 'none';
        }
        if (phoneLabelEl && labelEl) {
          phoneLabelEl.innerText = labelEl.value || mod.defLabel;
        }
      });

      const layoutMode = document.getElementById('cfgMobileHomeLayoutMode')?.value || '4col';
      const servicesGrid = document.getElementById('phoneServicesGrid');
      if (servicesGrid) {
        servicesGrid.className = (layoutMode === '3col' ? 'grid grid-cols-3 gap-2 text-center select-none' : 'grid grid-cols-4 gap-2 text-center select-none');
      }

      // 5. Weather & Telemetry
      const updateHeading = document.getElementById('cfgMobileUpdateHeading')?.value || 'આજનું અપડેટ';
      const weatherTemp = document.getElementById('cfgMobileWeatherTemp')?.value || '28°C';
      const weatherCond = document.getElementById('cfgMobileWeatherCondition')?.value || 'અંશત: વાદળ';
      const rainProb = document.getElementById('cfgMobileRainProb')?.value || '20%';
      const humidity = document.getElementById('cfgMobileHumidity')?.value || '68%';
      const windSpeed = document.getElementById('cfgMobileWindSpeed')?.value || '12 km/h';

      const phoneUpdateHeading = document.getElementById('phoneUpdateHeading');
      if (phoneUpdateHeading) phoneUpdateHeading.innerText = updateHeading;

      const phoneWeatherTemp = document.getElementById('phoneWeatherTemp');
      if (phoneWeatherTemp) phoneWeatherTemp.innerText = weatherTemp;

      const phoneWeatherCondition = document.getElementById('phoneWeatherCondition');
      if (phoneWeatherCondition) phoneWeatherCondition.innerText = weatherCond;

      const phoneRainProb = document.getElementById('phoneRainProb');
      if (phoneRainProb) phoneRainProb.innerText = rainProb;

      const phoneHumidity = document.getElementById('phoneHumidity');
      if (phoneHumidity) phoneHumidity.innerText = humidity;

      const phoneWindSpeed = document.getElementById('phoneWindSpeed');
      if (phoneWindSpeed) phoneWindSpeed.innerText = windSpeed;

      // 6. Featured Mandi & Advisories
      const mandiCrop = document.getElementById('cfgMobileMandiCrop')?.value || 'મગફળી';
      const mandiRate = document.getElementById('cfgMobileMandiRate')?.value || '₹ 10,400';
      const mandiUnit = document.getElementById('cfgMobileMandiUnit')?.value || 'પ્રતિ ક્વિન્ટલ';
      const mandiDelta = document.getElementById('cfgMobileMandiDelta')?.value || '▲ +2.5%';

      const phoneMandiCrop = document.getElementById('phoneMandiCrop');
      if (phoneMandiCrop) phoneMandiCrop.innerText = mandiCrop;

      const phoneMandiRate = document.getElementById('phoneMandiRate');
      if (phoneMandiRate) phoneMandiRate.innerText = mandiRate;

      const phoneMandiUnit = document.getElementById('phoneMandiUnit');
      if (phoneMandiUnit) phoneMandiUnit.innerText = mandiUnit;

      const phoneMandiDelta = document.getElementById('phoneMandiDelta');
      if (phoneMandiDelta) phoneMandiDelta.innerText = mandiDelta;

      const adv1Title = document.getElementById('cfgMobileAdv1Title')?.value || 'આવતીકાલે વરસાદની શક્યતા';
      const adv1Sub = document.getElementById('cfgMobileAdv1Sub')?.value || 'છંટકાવ કામગીરી આજે પૂર્ણ કરો.';
      const adv2Title = document.getElementById('cfgMobileAdv2Title')?.value || 'માટી ટેસ્ટ કરાવો';
      const adv2Sub = document.getElementById('cfgMobileAdv2Sub')?.value || 'ઉત્પાદન વધારવા માટે.';

      const phoneAdv1Title = document.getElementById('phoneAdv1Title');
      if (phoneAdv1Title) phoneAdv1Title.innerText = adv1Title;

      const phoneAdv1Sub = document.getElementById('phoneAdv1Sub');
      if (phoneAdv1Sub) phoneAdv1Sub.innerText = adv1Sub;

      const phoneAdv2Title = document.getElementById('phoneAdv2Title');
      if (phoneAdv2Title) phoneAdv2Title.innerText = adv2Title;

      const phoneAdv2Sub = document.getElementById('phoneAdv2Sub');
      if (phoneAdv2Sub) phoneAdv2Sub.innerText = adv2Sub;

      // 7. Navigation Tabs
      const tab1 = document.getElementById('cfgMobileTab1')?.value || 'હોમ';
      const tab2 = document.getElementById('cfgMobileTab2')?.value || 'મારું ખેતર';
      const tab3 = document.getElementById('cfgMobileTab3')?.value || 'માર્ટ';
      const tab4 = document.getElementById('cfgMobileTab4')?.value || 'સમુદાય';
      const tab5 = document.getElementById('cfgMobileTab5')?.value || 'મારું પેજ';
      const activeTab = document.getElementById('cfgMobileActiveTab')?.value || 'home';

      const phoneTab1Label = document.getElementById('phoneTab1Label');
      if (phoneTab1Label) phoneTab1Label.innerText = tab1;

      const phoneTab2Label = document.getElementById('phoneTab2Label');
      if (phoneTab2Label) phoneTab2Label.innerText = tab2;

      const phoneTab3Label = document.getElementById('phoneTab3Label');
      if (phoneTab3Label) phoneTab3Label.innerText = tab3;

      const phoneTab4Label = document.getElementById('phoneTab4Label');
      if (phoneTab4Label) phoneTab4Label.innerText = tab4;

      const phoneTab5Label = document.getElementById('phoneTab5Label');
      if (phoneTab5Label) phoneTab5Label.innerText = tab5;

      setMobileActiveTabPreview(activeTab);

      // 8. Maintenance Mode
      const maintenanceOn = document.getElementById('cfgMobileMaintenanceToggle')?.checked === true;
      const maintenanceMsg = document.getElementById('cfgMobileMaintenanceMsg')?.value || 'સિસ્ટમ મેન્ટેનન્સ ચાલુ છે. સેવાઓ ટૂંક સમયમાં શરૂ થશે.';
      const bannerMaint = document.getElementById('phoneMaintenanceBanner');
      const textMaint = document.getElementById('phoneMaintenanceMsg');

      if (bannerMaint) {
        bannerMaint.style.display = maintenanceOn ? 'flex' : 'none';
      }
      if (textMaint) {
        textMaint.innerText = maintenanceMsg;
      }
    }
    window.updateMobileAppPreview = updateMobileAppPreview;

    function saveMobileAppConfig() {
      const cfg = {
        brandColor: currentSelectedMobileColor,
        appNameEn: document.getElementById('cfgMobileAppNameEn')?.value || 'Ankurmitra',
        appNameGu: document.getElementById('cfgMobileAppNameGu')?.value || 'અંકુરમિત્ર',
        appTagline: document.getElementById('cfgMobileAppTagline')?.value || 'વિકાસ માટે સ્માર્ટ સાથી',
        farmerName: document.getElementById('cfgMobileFarmerName')?.value || 'જયેશ પટેલ',
        farmerLocation: document.getElementById('cfgMobileFarmerLocation')?.value || 'સુડાવડ, અમરેલી',
        greetingFormat: document.getElementById('cfgMobileGreetingFormat')?.value || 'shubh_savaar',
        alertCount: document.getElementById('cfgMobileAlertCount')?.value || '2',
        farmerAvatar: document.getElementById('cfgMobileFarmerAvatar')?.value || 'jayesh',
        headerBg: document.getElementById('cfgMobileHeaderBg')?.value || 'amreli_green',
        bannerVisible: document.getElementById('cfgMobileBannerVisible')?.checked !== false,
        bannerTag: document.getElementById('cfgMobileBannerTag')?.value || '🔆 ડ્રોન',
        bannerTitle: document.getElementById('cfgMobileBannerTitle')?.value || 'ડ્રોન છંટકાવ',
        bannerSubtitle: document.getElementById('cfgMobileBannerSubtitle')?.value || 'સુડાવડમાં આજે ઉપલબ્ધ · 4 એકર',
        bannerCta: document.getElementById('cfgMobileBannerCta')?.value || 'બુક કરો ➔',
        bannerTheme: document.getElementById('cfgMobileBannerTheme')?.value || 'drone',
        bannerSlide: document.getElementById('cfgMobileBannerSlide')?.value || '1',
        homeLayout: document.getElementById('cfgMobileHomeLayoutMode')?.value || '4col',
        weatherTemp: document.getElementById('cfgMobileWeatherTemp')?.value || '28°C',
        weatherCond: document.getElementById('cfgMobileWeatherCondition')?.value || 'અંશત: વાદળ',
        rainProb: document.getElementById('cfgMobileRainProb')?.value || '20%',
        humidity: document.getElementById('cfgMobileHumidity')?.value || '68%',
        windSpeed: document.getElementById('cfgMobileWindSpeed')?.value || '12 km/h',
        mandiCrop: document.getElementById('cfgMobileMandiCrop')?.value || 'મગફળી',
        mandiRate: document.getElementById('cfgMobileMandiRate')?.value || '₹ 10,400',
        mandiUnit: document.getElementById('cfgMobileMandiUnit')?.value || 'પ્રતિ ક્વિન્ટલ',
        mandiDelta: document.getElementById('cfgMobileMandiDelta')?.value || '▲ +2.5%',
        adv1Title: document.getElementById('cfgMobileAdv1Title')?.value || 'આવતીકાલે વરસાદની શક્યતા',
        adv1Sub: document.getElementById('cfgMobileAdv1Sub')?.value || 'છંટકાવ કામગીરી આજે પૂર્ણ કરો.',
        adv2Title: document.getElementById('cfgMobileAdv2Title')?.value || 'માટી ટેસ્ટ કરાવો',
        adv2Sub: document.getElementById('cfgMobileAdv2Sub')?.value || 'ઉત્પાદન વધારવા માટે.',
        tab1: document.getElementById('cfgMobileTab1')?.value || 'હોમ',
        tab2: document.getElementById('cfgMobileTab2')?.value || 'મારું ખેતર',
        tab3: document.getElementById('cfgMobileTab3')?.value || 'માર્ટ',
        tab4: document.getElementById('cfgMobileTab4')?.value || 'સમુદાય',
        tab5: document.getElementById('cfgMobileTab5')?.value || 'મારું પેજ',
        activeTab: document.getElementById('cfgMobileActiveTab')?.value || 'home',
        maintenance: document.getElementById('cfgMobileMaintenanceToggle')?.checked === true,
        maintenanceMsg: document.getElementById('cfgMobileMaintenanceMsg')?.value || 'સિસ્ટમ મેન્ટેનન્સ ચાલુ છે. સેવાઓ ટૂંક સમયમાં શરૂ થશે.',
        minVersion: document.getElementById('cfgMobileMinVersion')?.value || '2.4.0',
        latestVersion: document.getElementById('cfgMobileLatestVersion')?.value || '2.4.8',
        rollout: document.getElementById('cfgMobileRolloutSlider')?.value || '80',
        forceUpdate: document.getElementById('cfgMobileForceUpdate')?.checked !== false,
        modules: {},
        moduleLabels: {}
      };

      MOBILE_MODULE_DEFINITIONS.forEach(mod => {
        const el = document.getElementById(mod.checkId);
        cfg.modules[mod.id] = el ? el.checked : true;
        const lblEl = document.getElementById(mod.labelId);
        cfg.moduleLabels[mod.id] = lblEl ? lblEl.value : mod.defLabel;
      });

      try {
        localStorage.setItem('ankurmitra_mobile_config', JSON.stringify(cfg));
        localStorage.setItem('ankurmitra_mobile_app_config', JSON.stringify(cfg));
      } catch (_) {}

      recordSettingAuditEntry('Mobile app configuration, branding & release rules applied', 'Mobile App');

      if (typeof syncSettingsAcrossAllPages === 'function') {
        syncSettingsAcrossAllPages();
      }

      updateMobileAppPreview();

      if (typeof showPortalLoader === 'function') {
        showPortalLoader('Compiling mobile release manifest & syncing preview...');
        setTimeout(() => {
          if (typeof hidePortalLoader === 'function') hidePortalLoader();
          if (typeof showToast === 'function') {
            showToast('Mobile app configuration successfully applied and synced with preview.', 'success');
          }
        }, 380);
      } else if (typeof showToast === 'function') {
        showToast('Mobile app configuration successfully applied and synced with preview.', 'success');
      }
    }
    window.saveMobileAppConfig = saveMobileAppConfig;

    function resetMobileAppConfig() {
      try {
        localStorage.removeItem('ankurmitra_mobile_app_config');
        localStorage.removeItem('ankurmitra_mobile_config');
      } catch (_) {}

      if (document.getElementById('cfgMobileAppNameEn')) document.getElementById('cfgMobileAppNameEn').value = 'Ankurmitra';
      if (document.getElementById('cfgMobileAppNameGu')) document.getElementById('cfgMobileAppNameGu').value = 'અંકુરમિત્ર';
      if (document.getElementById('cfgMobileAppTagline')) document.getElementById('cfgMobileAppTagline').value = 'વિકાસ માટે સ્માર્ટ સાથી';
      
      if (document.getElementById('cfgMobileFarmerName')) document.getElementById('cfgMobileFarmerName').value = 'જયેશ પટેલ';
      if (document.getElementById('cfgMobileFarmerLocation')) document.getElementById('cfgMobileFarmerLocation').value = 'સુડાવડ, અમરેલી';
      if (document.getElementById('cfgMobileGreetingFormat')) document.getElementById('cfgMobileGreetingFormat').value = 'shubh_savaar';
      if (document.getElementById('cfgMobileAlertCount')) document.getElementById('cfgMobileAlertCount').value = '2';
      if (document.getElementById('cfgMobileFarmerAvatar')) document.getElementById('cfgMobileFarmerAvatar').value = 'jayesh';
      if (document.getElementById('cfgMobileHeaderBg')) document.getElementById('cfgMobileHeaderBg').value = 'amreli_green';

      if (document.getElementById('cfgMobileBannerVisible')) document.getElementById('cfgMobileBannerVisible').checked = true;
      if (document.getElementById('cfgMobileBannerTag')) document.getElementById('cfgMobileBannerTag').value = '🔆 ડ્રોન';
      if (document.getElementById('cfgMobileBannerTitle')) document.getElementById('cfgMobileBannerTitle').value = 'ડ્રોન છંટકાવ';
      if (document.getElementById('cfgMobileBannerSubtitle')) document.getElementById('cfgMobileBannerSubtitle').value = 'સુડાવડમાં આજે ઉપલબ્ધ · 4 એકર';
      if (document.getElementById('cfgMobileBannerCta')) document.getElementById('cfgMobileBannerCta').value = 'બુક કરો ➔';
      if (document.getElementById('cfgMobileBannerTheme')) document.getElementById('cfgMobileBannerTheme').value = 'drone';
      if (document.getElementById('cfgMobileBannerSlide')) document.getElementById('cfgMobileBannerSlide').value = '1';

      if (document.getElementById('cfgMobileHomeLayoutMode')) document.getElementById('cfgMobileHomeLayoutMode').value = '4col';

      MOBILE_MODULE_DEFINITIONS.forEach(mod => {
        const el = document.getElementById(mod.checkId);
        if (el) el.checked = true;
        const lblEl = document.getElementById(mod.labelId);
        if (lblEl) lblEl.value = mod.defLabel;
      });

      if (document.getElementById('cfgMobileUpdateHeading')) document.getElementById('cfgMobileUpdateHeading').value = 'આજનું અપડેટ';
      if (document.getElementById('cfgMobileWeatherTemp')) document.getElementById('cfgMobileWeatherTemp').value = '28°C';
      if (document.getElementById('cfgMobileWeatherCondition')) document.getElementById('cfgMobileWeatherCondition').value = 'અંશત: વાદળ';
      if (document.getElementById('cfgMobileRainProb')) document.getElementById('cfgMobileRainProb').value = '20%';
      if (document.getElementById('cfgMobileHumidity')) document.getElementById('cfgMobileHumidity').value = '68%';
      if (document.getElementById('cfgMobileWindSpeed')) document.getElementById('cfgMobileWindSpeed').value = '12 km/h';

      if (document.getElementById('cfgMobileMandiCrop')) document.getElementById('cfgMobileMandiCrop').value = 'મગફળી';
      if (document.getElementById('cfgMobileMandiRate')) document.getElementById('cfgMobileMandiRate').value = '₹ 10,400';
      if (document.getElementById('cfgMobileMandiUnit')) document.getElementById('cfgMobileMandiUnit').value = 'પ્રતિ ક્વિન્ટલ';
      if (document.getElementById('cfgMobileMandiDelta')) document.getElementById('cfgMobileMandiDelta').value = '▲ +2.5%';

      if (document.getElementById('cfgMobileAdv1Title')) document.getElementById('cfgMobileAdv1Title').value = 'આવતીકાલે વરસાદની શક્યતા';
      if (document.getElementById('cfgMobileAdv1Sub')) document.getElementById('cfgMobileAdv1Sub').value = 'છંટકાવ કામગીરી આજે પૂર્ણ કરો.';
      if (document.getElementById('cfgMobileAdv2Title')) document.getElementById('cfgMobileAdv2Title').value = 'માટી ટેસ્ટ કરાવો';
      if (document.getElementById('cfgMobileAdv2Sub')) document.getElementById('cfgMobileAdv2Sub').value = 'ઉત્પાદન વધારવા માટે.';

      if (document.getElementById('cfgMobileTab1')) document.getElementById('cfgMobileTab1').value = 'હોમ';
      if (document.getElementById('cfgMobileTab2')) document.getElementById('cfgMobileTab2').value = 'મારું ખેતર';
      if (document.getElementById('cfgMobileTab3')) document.getElementById('cfgMobileTab3').value = 'માર્ટ';
      if (document.getElementById('cfgMobileTab4')) document.getElementById('cfgMobileTab4').value = 'સમુદાય';
      if (document.getElementById('cfgMobileTab5')) document.getElementById('cfgMobileTab5').value = 'મારું પેજ';
      if (document.getElementById('cfgMobileActiveTab')) document.getElementById('cfgMobileActiveTab').value = 'home';

      if (document.getElementById('cfgMobileMaintenanceToggle')) document.getElementById('cfgMobileMaintenanceToggle').checked = false;
      if (document.getElementById('cfgMobileMaintenanceMsg')) document.getElementById('cfgMobileMaintenanceMsg').value = 'સિસ્ટમ મેન્ટેનન્સ ચાલુ છે. સેવાઓ ટૂંક સમયમાં શરૂ થશે.';
      if (document.getElementById('cfgMobileMinVersion')) document.getElementById('cfgMobileMinVersion').value = '2.4.0';
      if (document.getElementById('cfgMobileLatestVersion')) document.getElementById('cfgMobileLatestVersion').value = '2.4.8';
      if (document.getElementById('cfgMobileRolloutSlider')) document.getElementById('cfgMobileRolloutSlider').value = '80';
      if (document.getElementById('lblMobileRolloutVal')) document.getElementById('lblMobileRolloutVal').innerText = '80%';
      if (document.getElementById('cfgMobileForceUpdate')) document.getElementById('cfgMobileForceUpdate').checked = true;

      selectMobileColorSwatch('#0B6623', 'Forest Emerald', false);
      setMockupViewMode('sim');
      setMobileDeviceFrame('iphone');
      updateMobileAppPreview();

      if (typeof showToast === 'function') {
        showToast('Restored mobile app configuration to standard defaults.', 'info');
      }
    }
    window.resetMobileAppConfig = resetMobileAppConfig;
