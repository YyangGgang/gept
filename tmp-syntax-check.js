
    // 攔截右鍵選單，避免 Chrome / Edge 對英文考題提供「翻譯成中文」。
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    }, true);

    // =========================================================================
    // 1. QUESTION BANK (初級 Elementary CEFR A2 & 中級 Intermediate CEFR B1)
    // =========================================================================
    const QUESTION_BANK = {
      '初級': {
        listening: [
          { id: 'EL1', part: '第一部分：看圖辨義', svgType: 'coffee', audioText: 'Look at the picture. What is the man doing? A. He is making pour-over coffee. B. He is repairing a bicycle. C. He is washing his car.', prompt: '請聽語音並根據圖片選出最符合的描述（每題只播出一遍）：', options: ['A. He is making pour-over coffee.', 'B. He is repairing a bicycle.', 'C. He is washing his car.'], answer: 0 },
          { id: 'EL2', part: '第一部分：看圖辨義', svgType: 'runner', audioText: 'Look at the picture. Where are the people? A. They are running on a park track. B. They are swimming in the pool. C. They are boarding an airplane.', prompt: '請聽語音並根據圖片選出最符合的描述：', options: ['A. They are running on a park track.', 'B. They are swimming in the pool.', 'C. They are boarding an airplane.'], answer: 0 },
          { id: 'EL3', part: '第二部分：問答', audioText: 'Excuse me, how much is this train ticket to Kaohsiung?', prompt: '請聽英語問句，選出最適合的回答：', options: ['A. It takes about two hours.', 'B. It is eight hundred forty dollars.', 'C. Yes, the train station is over there.'], answer: 1 },
          { id: 'EL4', part: '第二部分：問答', audioText: 'When will the project meeting start this afternoon?', prompt: '請聽英語問句，選出最適合的回答：', options: ['A. In Conference Room B.', 'B. At two thirty.', 'C. Mr. Yang will host it.'], answer: 1 },
          { id: 'EL5', part: '第二部分：問答', audioText: 'Would you like some milk in your black tea?', prompt: '請聽英語問句，選出最適合的回答：', options: ['A. No, thank you. I prefer it plain.', 'B. Yes, I bought it yesterday.', 'C. The tea shop closes at nine.'], answer: 0 },
          { id: 'EL6', part: '第三部分：簡短對話', audioText: 'Woman: Are you going to join the half marathon this Sunday? Man: Yes, I have trained for three months. Question: What will the man do this Sunday?', prompt: '請聽對話與問題，選出最適合的答案：', options: ['A. Watch a movie at home.', 'B. Run in a half marathon.', 'C. Visit his doctor.'], answer: 1 },
          { id: 'EL7', part: '第三部分：簡短對話', audioText: 'Man: I forgot to bring my umbrella, and it is raining heavily outside. Woman: Do not worry. I have an extra one in my locker. Question: What does the woman mean?', prompt: '請聽對話與問題，選出最適合的答案：', options: ['A. She can lend the man an umbrella.', 'B. She also forgot her umbrella.', 'C. The rain has already stopped.'], answer: 0 },
          { id: 'EL8', part: '第三部分：簡短對話', audioText: 'Woman: How do you usually go to the office? Man: I used to drive, but now I take the MRT every day to save time. Question: How does the man go to work now?', prompt: '請聽對話與問題，選出最適合的答案：', options: ['A. By car.', 'B. By bus.', 'C. By MRT.'], answer: 2 },
          { id: 'EL9', part: '第四部分：短文聽解', audioText: 'Attention please. The library will close in fifteen minutes at nine o clock. If you would like to borrow any books today, please bring them to the front desk on the first floor now.', prompt: '請聽廣播短文，選出最適合的答案（What should visitors do if they want to borrow books tonight?）：', options: ['A. Come back tomorrow morning.', 'B. Go to the front desk on the first floor now.', 'C. Use the computers on the third floor.'], answer: 1 },
          { id: 'EL10', part: '第四部分：短文聽解', audioText: 'Welcome to Sunny Bakery. Today all fresh strawberry cakes are twenty percent off before five p.m. Buy two loaves of whole wheat bread and you will get a free cup of hot coffee.', prompt: '請聽店家廣播，選出最適合的答案（How can a customer get a free cup of coffee?）：', options: ['A. Buy a strawberry cake after five p.m.', 'B. Buy two loaves of whole wheat bread.', 'C. Spend more than five hundred dollars.'], answer: 1 }
        ],
        reading: [
          { id: 'ER1', part: '第一部分：詞彙', prompt: '1. Mr. Lin checks his email every morning ______ he arrives at the office.', options: ['A. as soon as', 'B. so that', 'C. even though', 'D. because of'], answer: 0 },
          { id: 'ER2', part: '第一部分：詞彙', prompt: '2. Please remember to turn off the air conditioner before ______ the classroom.', options: ['A. leave', 'B. left', 'C. leaving', 'D. to leave'], answer: 2 },
          { id: 'ER3', part: '第一部分：詞彙', prompt: '3. The new public library is very ______; it takes only five minutes to walk there from the metro station.', options: ['A. convenient', 'B. expensive', 'C. nervous', 'D. dangerous'], answer: 0 },
          { id: 'ER4', part: '第一部分：詞彙', prompt: '4. Neither my sister nor my parents ______ spicy food, so we ordered mild soup.', options: ['A. likes', 'B. liking', 'C. like', 'D. is liking'], answer: 2 },
          { id: 'ER5', part: '第二部分：段落填空 (題組 5~7)', passage: 'Keeping a regular exercise habit is important for everyone. Many office workers spend more than eight hours (5)______ in front of a computer every day. Doctors suggest that brisk walking or jogging for thirty minutes three times a week (6)______ improve heart health and reduce stress. In addition, drinking enough water during exercise helps the body stay (7)______.', prompt: '5. 請選出第 (5) 題最適合填入空格的選項：', options: ['A. sit', 'B. sitting', 'C. sat', 'D. to sit'], answer: 1 },
          { id: 'ER6', part: '第二部分：段落填空 (題組 5~7)', prompt: '6. 請選出第 (6) 題最適合填入空格的選項：', options: ['A. can', 'B. having', 'C. ought', 'D. is'], answer: 0 },
          { id: 'ER7', part: '第二部分：段落填空 (題組 5~7)', prompt: '7. 請選出第 (7) 題最適合填入空格的選項：', options: ['A. crowded', 'B. energetic', 'C. polite', 'D. narrow'], answer: 1 },
          { id: 'ER8', part: '第三部分：閱讀理解 (題組 8~10)', passage: '【Notice: Kaohsiung City Community Sports Center】\nStarting November 1, our swimming pool on the B1 floor will be closed for annual maintenance for five days. It will reopen on November 6 at 6:00 a.m. During this period, the fitness gym and indoor running track on the 3rd floor will remain open as usual from 6:00 a.m. to 10:00 p.m. Monthly pass holders will automatically receive a 5-day extension on their membership.', prompt: '8. Why will the swimming pool be closed?', options: ['A. For a city swimming competition.', 'B. For annual maintenance.', 'C. Because of a shortage of lifeguards.', 'D. Because the building is moving.'], answer: 1 },
          { id: 'ER9', part: '第三部分：閱讀理解 (題組 8~10)', prompt: '9. Which facility is on the third floor?', options: ['A. The swimming pool.', 'B. The coffee shop.', 'C. The indoor running track.', 'D. The parking lot.'], answer: 2 },
          { id: 'ER10', part: '第三部分：閱讀理解 (題組 8~10)', prompt: '10. What will monthly pass holders get?', options: ['A. A free sports towel.', 'B. A five-day membership extension.', 'C. A fifty percent refund.', 'D. Free swimming lessons.'], answer: 1 }
        ],
        speaking: [
          { id: 'ES1', part: '第一部分：純音聽複誦 (Repeat)', audioOnly: true, timeLimitSec: 10, audioText: 'Could you tell me where the nearest post office is?', expectedKeywords: ['could', 'you', 'tell', 'me', 'where', 'nearest', 'post', 'office'], instruction: '【題目不印在試卷上】請點擊下方「耳機播音 2 次」，聽完兩次語音後，立即在 10 秒內清楚複誦該英文句子。' },
          { id: 'ES2', part: '第一部分：純音聽複誦 (Repeat)', audioOnly: true, timeLimitSec: 10, audioText: 'Remember to back up your files before shutting down the computer.', expectedKeywords: ['remember', 'back', 'up', 'files', 'before', 'shutting', 'down', 'computer'], instruction: '【題目不印在試卷上】請點擊下方「耳機播音 2 次」，聽完兩次語音後，立即在 10 秒內清楚複誦該英文句子。' },
          { id: 'ES3', part: '第二部分：朗讀句子與短文 (Read Aloud)', audioOnly: false, timeLimitSec: 20, audioText: 'Reading books every day opens a window to the world. Even fifteen minutes of reading before bedtime can help us learn new ideas and relax our minds.', expectedKeywords: ['reading', 'books', 'every', 'day', 'window', 'world', 'fifteen', 'minutes', 'bedtime', 'relax'], instruction: '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。' },
          { id: 'ES4', part: '第三部分：純音聽回答問題 (Answer Questions)', audioOnly: true, timeLimitSec: 15, audioText: 'What do you usually like to do on weekends to relax?', expectedKeywords: ['weekend', 'like', 'run', 'coffee', 'family', 'read', 'exercise', 'relax', 'usually'], instruction: '【題目不印在試卷上】請點擊「耳機播音 2 次」聽取問題，播畢後於 15 秒內以英語錄音回答。' },
          { id: 'ES5', part: '第三部分：純音聽回答問題 (Answer Questions)', audioOnly: true, timeLimitSec: 15, audioText: 'How often do you exercise, and what is your favorite sport?', expectedKeywords: ['exercise', 'week', 'every', 'favorite', 'sport', 'running', 'jogging', 'swimming', 'basketball'], instruction: '【題目不印在試卷上】請點擊「耳機播音 2 次」聽取問題，播畢後於 15 秒內以英語錄音回答。' }
        ],
        writing: {
          sentences: [
            { id: 'EW1', type: '句子改寫', prompt: '1. 【句子改寫】It was raining heavily, so they canceled the outdoor concert.\n請以 Because... 改寫全句：', sample: 'Because it was raining heavily, they canceled the outdoor concert.', keywords: ['because', 'raining', 'canceled', 'concert'] },
            { id: 'EW2', type: '句子合併', prompt: '2. 【句子合併】The boy is my cousin. / The boy is wearing a blue jacket.\n請以關係代名詞 who 合併為一句：', sample: 'The boy who is wearing a blue jacket is my cousin.', keywords: ['boy', 'who', 'wearing', 'blue', 'jacket', 'cousin'] },
            { id: 'EW3', type: '句子重組', prompt: '3. 【句子重組】請將提示字詞重組為完整句子：\nenough / is / old / drive / to / a car / David / .', sample: 'David is old enough to drive a car.', keywords: ['david', 'is', 'old', 'enough', 'to', 'drive'] }
          ],
          essay: {
            id: 'EW_ESSAY',
            title: '第二部分：看圖段落寫作（約 50 字，佔 50%）',
            svgType: 'morning',
            prompt: '請看圖。用約 50 個英文字描述圖中的早晨：有人在運動，桌上有一杯飲料。並寫出這幅情景給你的感受。',
            sample: 'Every Sunday morning, I wake up early and go jogging in the park near my home for thirty minutes. After exercising, I enjoy making a cup of fresh pour-over coffee and having breakfast with my family. This healthy routine makes me feel energetic and happy all week.',
            minWords: 35
          }
        }
      },
      '中級': {
        listening: [
          { id: 'IL1', part: '第一部分：看圖辨義', svgType: 'schedule', audioText: 'Look at the production dashboard. Which statement is true? A. Line W-F has the highest output efficiency today. B. All three production lines are shut down. C. The maintenance schedule was canceled.', prompt: '請聽語音並根據圖表選出最符合的敘述（每題只播出一遍）：', options: ['A. Line W-F has the highest output efficiency today.', 'B. All three production lines are shut down.', 'C. The maintenance schedule was canceled.', 'D. Output dropped below fifty percent on all lines.'], answer: 0 },
          { id: 'IL2', part: '第一部分：看圖辨義', svgType: 'coffee', audioText: 'Look at the picture. What is the barista adjusting before brewing the coffee? A. He is checking the water temperature and grind size. B. He is packing coffee beans into shipping boxes. C. He is repairing the cash register. D. He is painting the café wall.', prompt: '請聽語音並根據圖片選出最符合的敘述：', options: ['A. He is checking the water temperature and grind size.', 'B. He is packing coffee beans into shipping boxes.', 'C. He is repairing the cash register.', 'D. He is painting the café wall.'], answer: 0 },
          { id: 'IL3', part: '第二部分：問答', audioText: 'Should we deploy the updated scheduling algorithm tonight or wait until Friday?', prompt: '請聽英語問句，選出最適合的回應：', options: ['A. Let us run one more stress test and deploy it on Friday.', 'B. Yes, the software engineer works on the fifth floor.', 'C. It was updated three months ago.', 'D. I prefer taking the high-speed rail.'], answer: 0 },
          { id: 'IL4', part: '第二部分：問答', audioText: 'How did you manage to improve your half-marathon pace so significantly?', prompt: '請聽英語問句，選出最適合的回應：', options: ['A. The registration fee was one thousand dollars.', 'B. By tracking my heart rate zones and cadence consistently.', 'C. The race will take place in Kaohsiung next month.', 'D. No, I did not bring my running shoes.'], answer: 1 },
          { id: 'IL5', part: '第二部分：問答', audioText: 'Do you know why the quarterly supply chain meeting was postponed?', prompt: '請聽英語問句，選出最適合的回應：', options: ['A. Because several key regional managers were delayed by the typhoon.', 'B. The meeting room can accommodate twenty people.', 'C. Yes, please send me the spreadsheet.', 'D. We have already signed the contract.'], answer: 0 },
          { id: 'IL6', part: '第三部分：簡短對話', audioText: 'Woman: Our wireless signal in the study room is still weak even after replacing the main router. Man: Setting up a mesh Wi-Fi node in the hallway should eliminate the dead zone. Question: What does the man suggest doing?', prompt: '請聽對話與問題，選出最適合的答案：', options: ['A. Moving their desks into the living room.', 'B. Installing a mesh Wi-Fi node in the hallway.', 'C. Canceling their internet subscription.', 'D. Calling the building security guard.'], answer: 1 },
          { id: 'IL7', part: '第三部分：簡短對話', audioText: 'Man: I am thinking about putting all my savings into a single tech stock. Woman: That carries high concentration risk. Diversifying through a global index ETF is much more resilient for a ten-year plan. Question: What is the woman advising the man to do?', prompt: '請聽對話與問題，選出最適合的答案：', options: ['A. Borrow money to buy more tech stocks.', 'B. Spend all his savings on a new car.', 'C. Diversify his investment using a global index ETF.', 'D. Close his bank account immediately.'], answer: 2 },
          { id: 'IL8', part: '第三部分：簡短對話', audioText: 'Woman: Did the client approve our database migration proposal? Man: They agreed to the timeline, provided that we guarantee zero downtime during peak hours. Question: Under what condition did the client agree?', prompt: '請聽對話與問題，選出最適合的答案：', options: ['A. The team must reduce the budget by half.', 'B. There must be no service interruption during peak hours.', 'C. The project must be completed within three days.', 'D. They requested a completely different programming language.'], answer: 1 },
          { id: 'IL9', part: '第四部分：簡短談話', audioText: 'Good morning, team. Before we begin today sprint review, please note that our automated production scheduling system will undergo a routine security patch this Saturday from 2 a.m. to 4 a.m. All batch jobs scheduled during that window will automatically queue and resume once the server restarts.', prompt: '請聽簡短談話，選出最適合的答案（What will happen to batch jobs scheduled between 2 a.m. and 4 a.m. this Saturday?）：', options: ['A. They will be permanently deleted.', 'B. They will queue automatically and run after the restart.', 'C. Engineers must run them manually on Sunday.', 'D. They will be transferred to an external vendor.'], answer: 1 },
          { id: 'IL10', part: '第四部分：簡短談話', audioText: 'When brewing specialty pour-over coffee, water temperature plays a decisive role in extraction. Light-roasted beans generally require hotter water between ninety-two and ninety-four degrees Celsius to bring out floral and fruity acidity, whereas dark roasts taste more balanced at eighty-eight degrees.', prompt: '請聽簡短談話，選出最適合的答案（According to the speaker, why is hotter water recommended for light-roasted coffee beans?）：', options: ['A. To cool down the ceramic dripper faster.', 'B. To extract their floral and fruity notes effectively.', 'C. To remove all caffeine from the beverage.', 'D. To make the coffee beans last longer in storage.'], answer: 1 }
        ],
        reading: [
          { id: 'IR1', part: '第一部分：詞彙', prompt: '1. The new intelligent scheduling platform has significantly ______ production bottlenecks across all three rolling mills.', options: ['A. alleviated', 'B. hesitated', 'C. exaggerated', 'D. wandered'], answer: 0 },
          { id: 'IR2', part: '第一部分：詞彙', prompt: '2. Had the engineering team detected the sensor anomaly earlier, the unexpected downtime ______ avoided.', options: ['A. will be', 'B. could have been', 'C. has been', 'D. was being'], answer: 1 },
          { id: 'IR3', part: '第一部分：詞彙', prompt: '3. Consistent long-term asset allocation requires emotional discipline, ______ when global financial markets experience sharp short-term volatility.', options: ['A. barely', 'B. particularly', 'C. reluctantly', 'D. formerly'], answer: 1 },
          { id: 'IR4', part: '第一部分：詞彙', prompt: '4. The software architect insisted that every API endpoint ______ strict authentication validation before release.', options: ['A. undergo', 'B. undergoes', 'C. underwent', 'D. undergoing'], answer: 0 },
          { id: 'IR5', part: '第二部分：段落填空 (題組 5~7)', passage: 'Artificial intelligence coding assistants are transforming modern software engineering. Instead of manually writing repetitive boilerplate code, systems analysts can now define clear architectural rules and (5)______ routine implementation tasks to autonomous agents. (6)______, human oversight remains indispensable for validating business logic, security boundaries, and edge-case resilience. Teams that combine structured specifications (7)______ automated verification achieve both faster delivery and higher reliability.', prompt: '5. 請選出第 (5) 題最適合填入空格的選項：', options: ['A. delegate', 'B. prohibit', 'C. pretend', 'D. offend'], answer: 0 },
          { id: 'IR6', part: '第二部分：段落填空 (題組 5~7)', prompt: '6. 請選出第 (6) 題最適合填入空格的選項：', options: ['A. Otherwise', 'B. Nevertheless', 'C. For instance', 'D. As a result of'], answer: 1 },
          { id: 'IR7', part: '第二部分：段落填空 (題組 5~7)', prompt: '7. 請選出第 (7) 題最適合填入空格的選項：', options: ['A. with', 'B. from', 'C. into', 'D. over'], answer: 0 },
          { id: 'IR8', part: '第三部分：閱讀理解 (題組 8~10)', passage: '【Research Brief: Physiological Metrics in Endurance Running】\nRecent sports science studies indicate that recreational marathon runners often train too fast on their easy days and too slow on their interval days. By monitoring heart rate zones and maintaining a cadence of around 175 to 185 steps per minute, runners can minimize joint impact while improving aerobic efficiency. Over a 16-week training cycle, athletes who kept 80% of their weekly mileage in low-intensity Zone 2 improved their half-marathon finish times by an average of 7%, compared to only 2% among those who ran at moderate-to-high intensity every session.', prompt: '8. What common mistake do recreational marathon runners often make?', options: ['A. They replace all outdoor runs with swimming.', 'B. They run too fast on easy days and too slow on interval days.', 'C. They drink too much water before starting a race.', 'D. They change their running shoes every week.'], answer: 1 },
          { id: 'IR9', part: '第三部分：閱讀理解 (題組 8~10)', prompt: '9. What is the benefit of maintaining a higher running cadence (175–185 spm)?', options: ['A. It reduces impact stress on the joints.', 'B. It eliminates the need for warm-up stretching.', 'C. It doubles maximum heart rate immediately.', 'D. It allows runners to skip sleep before race day.'], answer: 0 },
          { id: 'IR10', part: '第三部分：閱讀理解 (題組 8~10)', prompt: '10. According to the passage, which training approach yielded the 7% improvement?', options: ['A. Running at maximum speed every day for two weeks.', 'B. Keeping 80% of weekly mileage in low-intensity Zone 2.', 'C. Training only once a month for 16 weeks.', 'D. Avoiding heart rate monitors completely.'], answer: 1 }
        ],
        speaking: [
          { id: 'IS1', part: '第一部分：朗讀短文 (Read Aloud)', audioOnly: false, timeLimitSec: 25, audioText: 'Digital transformation in manufacturing relies on accurate real-time data. By integrating automated scheduling algorithms with cloud dashboards, engineers can respond swiftly to urgent orders and optimize energy consumption across production lines.', expectedKeywords: ['digital', 'transformation', 'manufacturing', 'accurate', 'data', 'automated', 'scheduling', 'algorithms', 'engineers', 'optimize'], instruction: '【試卷顯示短文】請先審閱下方短文，並於 25 秒內清楚、流暢地朗讀錄音。' },
          { id: 'IS2', part: '第二部分：純音聽回答問題 (Answer Questions - 15秒)', audioOnly: true, timeLimitSec: 15, audioText: 'How has technology or artificial intelligence helped you improve efficiency at work?', expectedKeywords: ['technology', 'ai', 'efficiency', 'work', 'automate', 'code', 'schedule', 'data', 'time', 'system'], instruction: '【題目不印在試卷上】請點擊「耳機播音 2 次」，聽完問題後於 15 秒內錄音回答。' },
          { id: 'IS3', part: '第二部分：純音聽回答問題 (Answer Questions - 15秒)', audioOnly: true, timeLimitSec: 15, audioText: 'What factors do you consider most important when making a long-term financial or learning plan?', expectedKeywords: ['long-term', 'plan', 'risk', 'goal', 'consistent', 'time', 'discipline', 'asset', 'future'], instruction: '【題目不印在試卷上】請點擊「耳機播音 2 次」，聽完問題後於 15 秒內錄音回答。' },
          { id: 'IS4', part: '第二部分：純音聽回答問題 (Answer Questions - 30秒)', audioOnly: true, timeLimitSec: 30, audioText: 'Describe a challenge you recently solved in a project and explain what you learned from the experience.', expectedKeywords: ['challenge', 'project', 'solved', 'system', 'team', 'learned', 'problem', 'solution', 'improve'], instruction: '【題目不印在試卷上】請點擊「耳機播音 2 次」，聽完問題後於 30 秒內錄音詳細回答。' },
          { id: 'IS5', part: '第三部分：看圖敘述 (Picture Description - 45秒)', audioOnly: false, timeLimitSec: 45, svgType: 'balance', printedQuestions: ['1. 圖中的三個部分分別是什麼？', '2. 你覺得這樣安排一週好嗎？為什麼？', '3. 你自己會怎麼調整？'], audioText: 'Please describe the work, running, and home balance shown in the picture, and share your personal view.', expectedKeywords: ['balance', 'work', 'health', 'exercise', 'family', 'technology', 'schedule', 'important'], instruction: '【試卷印有圖與問題】請看圖後直接回答，不必把題號唸出來。' }
        ],
        writing: {
          translation: {
            id: 'IW_TRANS',
            title: '第一部分：中譯英（佔總分 40%，0~5 級分 × 8 = 40 分）',
            prompt: '請將以下中文段落翻譯為通順、達意且前後連貫的英文：\n「規律的運動不僅能增強體能，還能幫助我們在面對高壓工作時保持清晰的思考與專注力。」',
            sample: 'Regular exercise not only strengthens our physical fitness, but also helps us maintain clear thinking and focus when facing high-pressure work.',
            keywords: ['regular', 'exercise', 'not only', 'physical', 'help', 'clear', 'focus', 'work', 'pressure']
          },
          essay: {
            id: 'IW_ESSAY',
            title: '第二部分：英文作文（佔總分 60%，0~5 級分 × 12 = 60 分，建議 80~120 字）',
            prompt: 'Topic: How AI Tools and Automated Systems Are Changing the Way We Work and Learn.\n請撰寫一篇約 80~120 字的英文短文，說明 AI 工具或自動化系統如何提升工作效率與學習品質，並分享您的實際經驗與看法。',
            sample: 'In recent years, AI tools and automated systems have dramatically improved how we work and learn. As a systems analyst, I use intelligent scheduling algorithms and AI coding assistants to streamline complex workflows and reduce human errors. Instead of spending hours on repetitive tasks, professionals can focus on system architecture and strategic decision-making. In daily learning, personalized digital platforms also allow us to practice language skills anytime. By embracing these tools responsibly, we can achieve higher productivity and a healthier work-life balance.',
            minWords: 60
          }
        }
      }
    };

    // =========================================================================
    // 2. APPLICATION STATE & INITIAL SAMPLE RECORDS (與 Google Sheet 全民英檢成績(自動) 對齊)
    // =========================================================================
    const INITIAL_RECORDS = [
      {
        sessionId: 'GEPT-DEMO-001',
        userName: '系統範例考生A',
        level: '初級',
        status: '已完成',
        startTime: '19:05:12',
        endTime: '19:33:40',
        durationMin: 28.5,
        progressPct: '100%',
        lScore: 96,
        rScore: 108,
        sScore: 86,
        wScore: 82,
        lastCheckpoint: '已完成全卷',
        notes: '聽力8/10、閱讀9/10；二階音聽口說4.3級分、寫作4.1級分（結構展示範例）'
      },
      {
        sessionId: 'GEPT-DEMO-002',
        userName: '系統範例考生B',
        level: '中級',
        status: '中途關閉',
        startTime: '19:35:00',
        endTime: '19:47:18',
        durationMin: 12.3,
        progressPct: '55%',
        lScore: 84,
        rScore: 60,
        sScore: 0,
        wScore: 0,
        lastCheckpoint: '第一階段-閱讀第6題',
        notes: '視窗關閉觸發 visibilitychange + navigator.sendBeacon 自動寫入當下進度（結構展示範例）'
      }
    ];

    const state = {
      user: {
        chineseName: '',
        email: '',
        picture: '',
        authMode: '',
        loggedIn: false
      },
      googleClientId: '',
      pickedSlotKeys: {},
      practiceStemKeys: {},
      practiceRound: { '初級': 1, '中級': 1 },
      examUsePracticeBlock: false,
      examPaper: null,
      activeTab: 'lobby', // 'lobby' | 'practice' | 'exam' | 'records' | 'blueprint'
      mainNavHidden: false,
      brandBarHidden: false,
      stageStickY: 0,
      activeStage: 'listening', // 'listening' | 'reading' | 'speaking' | 'writing'
      webhookUrl: '',
      lastSheetError: '',
      generationCount: 1,
      dynamicMetaMap: {},
      records: [],
      openReviewId: '',
      practice: {
        level: '初級',
        stage: 'listening', // 'listening' | 'reading' | 'speaking' | 'writing'
        listeningAns: {},
        readingAns: {},
        speakingRes: {},
        writingRes: { s1: '', s2: '', s3: '', trans: '', essay: '', feedbackMsg: '', score100: 0 },
        streak: 0,
        lastEncourageMsg: '✨ 歡迎來到自主練習專區！這裡不計時也不會寫入正式成績試算表，請放心點選題目練習，系統會即時給您鼓勵與解析回饋喔！'
      },
      exam: {
        active: false,
        sessionId: '',
        level: '初級',
        startTimeMs: 0,
        startTimeStr: '',
        remainingSeconds: 1800,
        timerInterval: null,
        lastCheckpoint: '尚未開始',
        listeningAnswers: {},
        listeningPlayed: {},
        readingAnswers: {},
        speakingScores: {}, // id -> { playedTwice, recorded, transcript, fluencyBand, grammarBand, score100 }
        writingAnswers: {
          s1: '',
          s2: '',
          s3: '',
          trans: '',
          essay: '',
          gradedScore: 0,
          feedback: ''
        }
      }
    };

    // 正式環境請填入 Google Cloud「網頁應用程式」OAuth 用戶端 ID。留空時不登入、也不使用寫死帳號。
    const GOOGLE_OAUTH_CLIENT_ID = '196293768198-htgellkfbi4meijha9d9jdq2vusj6324.apps.googleusercontent.com';
    // 試算表寫入走 Apps Script（執行身分：試算表擁有者）。留空時只更新本機預覽，不向考生索取試算表授權。
    // 部署 gas/Code.gs 為網頁應用程式後，把 https://script.google.com/macros/s/.../exec 貼在這裡。
    const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyP8d_W68g1BB-tvTQh8WueSDOuk6F5v4Q-YAVaOuqCvhrTYVu_CuuvOrpu1lBA7vvjwQ/exec';

    function extractChineseNameFromGooglePayload(payload) {
      if (!payload) return '';
      const family = (payload.family_name || '').trim();
      const given = (payload.given_name || '').trim();
      if (family && given && /[\u4e00-\u9fa5]/.test(family + given)) {
        return `${family}${given}`;
      }
      if (payload.name && String(payload.name).trim()) {
        return String(payload.name).trim();
      }
      const email = (payload.email || '').trim();
      if (email.includes('@')) return email.split('@')[0];
      return '';
    }

    // Safe Storage Helpers & Automatic Google Account Verification Check
    function loadSavedState() {
      try {
        localStorage.removeItem('gept_google_user_v1');
        localStorage.removeItem('gept_google_verified_account_v4');
        sessionStorage.removeItem('gept_google_auth_session_v4');
        sessionStorage.removeItem('gept_explicit_logout_v4');
        localStorage.removeItem('gept_sheet_records_v1');
        localStorage.removeItem('gept_sheet_records_v2');

        const rawRecords = localStorage.getItem('gept_sheet_records_v3');
        if (rawRecords) {
          state.records = JSON.parse(rawRecords);
        } else {
          state.records = INITIAL_RECORDS.slice();
          localStorage.setItem('gept_sheet_records_v3', JSON.stringify(state.records));
        }
        const savedWebhook = localStorage.getItem('gept_gas_webhook_v1');
        if (savedWebhook) state.webhookUrl = savedWebhook;
        localStorage.removeItem('gept_gemini_api_key_v1');
        const savedClientId = localStorage.getItem('gept_google_client_id_v1');
        if (savedClientId) state.googleClientId = savedClientId;
      } catch (e) {
        state.records = INITIAL_RECORDS.slice();
      }
    }

    function saveRecordsToStorage() {
      const write = (records) => {
        localStorage.setItem('gept_sheet_records_v3', JSON.stringify(records));
      };
      try {
        write(state.records);
      } catch (e) {
        try {
          const slim = state.records.map((rec, idx) => {
            if (idx < 12 || !rec.review) return rec;
            const copy = Object.assign({}, rec);
            delete copy.review;
            return copy;
          });
          write(slim);
          state.records = slim;
        } catch (e2) {
          // Ignore sandbox storage errors
        }
      }
    }

    // 試算表開始／結束時間只記 HH:MM:SS，不寫日期
    function formatNow(dateObj) {
      const d = dateObj || new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    // Toast notification
    function showToast(title, message, tone) {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const div = document.createElement('div');
      const borderClass = tone === 'amber' ? 'border-amber-500 bg-amber-950/95 text-amber-100'
                        : tone === 'emerald' ? 'border-emerald-500 bg-slate-900/95 text-white'
                        : 'border-indigo-500 bg-slate-900/95 text-white';
      div.className = `pointer-events-auto p-3.5 rounded-xl border-l-4 shadow-lg text-xs transition-all ${borderClass}`;
      div.innerHTML = `<div class="font-bold mb-0.5">${title}</div><div class="opacity-90 leading-relaxed">${message}</div>`;
      container.appendChild(div);
      setTimeout(() => {
        if (div.parentNode) div.parentNode.removeChild(div);
      }, 4200);
    }

    let examLeaveIntent = null;

    function examStageLabel(stageName) {
      const labels = {
        listening: '一階聽力',
        reading: '一階閱讀',
        speaking: '二階音聽口說',
        writing: '二階寫作'
      };
      return labels[stageName] || '目前程序';
    }

    function examStayText() {
      const stage = examStageLabel(state.activeStage);
      const checkpoint = state.exam && state.exam.lastCheckpoint && state.exam.lastCheckpoint !== '尚未開始'
        ? state.exam.lastCheckpoint
        : stage;
      return `目前程序：${stage}（${checkpoint}）`;
    }

    function showExamLeaveGuard(opts) {
      if (examLeaveIntent) return;
      const root = document.getElementById('exam-leave-guard');
      if (!root) {
        if (opts && typeof opts.onLeave === 'function') opts.onLeave();
        return;
      }
      examLeaveIntent = opts || {};
      const title = document.getElementById('exam-leave-guard-title');
      const body = document.getElementById('exam-leave-guard-body');
      const where = document.getElementById('exam-leave-guard-where');
      const stay = document.getElementById('exam-leave-guard-stay');
      const go = document.getElementById('exam-leave-guard-go');
      if (title) title.textContent = examLeaveIntent.title || '您可能誤觸而離開目前程序';
      if (body) body.textContent = examLeaveIntent.body || '';
      if (where) where.textContent = examLeaveIntent.where || examStayText();
      if (stay) stay.textContent = examLeaveIntent.stayLabel || '留在目前程序';
      if (go) {
        if (typeof examLeaveIntent.onLeave === 'function') {
          go.classList.remove('hidden');
          go.textContent = examLeaveIntent.leaveLabel || '確認離開';
        } else {
          go.classList.add('hidden');
        }
      }
      root.classList.remove('hidden');
      root.classList.add('flex');
      if (stay) stay.focus();
    }

    function dismissExamLeaveGuard(confirmed) {
      const intent = examLeaveIntent;
      examLeaveIntent = null;
      const root = document.getElementById('exam-leave-guard');
      if (root) {
        root.classList.add('hidden');
        root.classList.remove('flex');
      }
      if (confirmed && intent && typeof intent.onLeave === 'function') intent.onLeave();
    }

    function armExamBackGuard() {
      if (!state.exam || !state.exam.active) return;
      try {
        if (history.state && history.state.geptExamGuard) return;
        history.pushState({ geptExamGuard: 1 }, '');
      } catch (e) {}
    }

    // =========================================================================
    // 3. GOOGLE AUTH AUTO-CHECK & AUTOMATIC CHINESE NAME RETRIEVAL
    //    (1. 透過檢核 Google 帳號驗證，若能取得帳號則直接進入，否則必需登入)
    //    (2. 中文姓名直接抓取 Google 提供資訊，不需再自己寫入)
    // =========================================================================
    function decodeGoogleJwtCredential(jwtToken) {
      try {
        const base64Url = jwtToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
        const jsonPayload = decodeURIComponent(
          atob(padded)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    }

    function completeGoogleLogin(googlePayload, authMode, silentAutoEnter) {
      const email = (googlePayload.email || '').trim();
      const chineseName = extractChineseNameFromGooglePayload(googlePayload);
      if (!email || !chineseName) {
        state.user.loggedIn = false;
        renderHeaderAuth();
        updateActiveView();
        return false;
      }

      state.user = {
        chineseName: chineseName,
        email: email,
        picture: googlePayload.picture || '',
        authMode: authMode || 'Google 帳號驗證',
        loggedIn: true
      };
      try {
        sessionStorage.removeItem('gept_explicit_logout_v5');
        sessionStorage.setItem('gept_google_auth_session_v5', JSON.stringify(state.user));
        localStorage.removeItem('gept_google_verified_account_v4');
      } catch (e) {}

      const errBox = document.getElementById('login-validation-error');
      if (errBox) errBox.classList.add('hidden');

      renderHeaderAuth();
      state.activeTab = 'lobby';
      updateActiveView();

      if (silentAutoEnter) {
        showToast('✓ Google 帳號自動檢核通過', `已取得您的 Google 帳號並自動抓取中文姓名「${state.user.chineseName}」，直接進入系統！`, 'emerald');
      } else {
        showToast('Google 帳號驗證成功', `已直接從 Google 抓取您的中文姓名「${state.user.chineseName}」顯示於畫面右上角！`, 'emerald');
      }
      return true;
    }

    function resolveGoogleClientId() {
      const fromConst = (GOOGLE_OAUTH_CLIENT_ID || '').trim();
      if (fromConst.includes('.apps.googleusercontent.com')) return fromConst;
      const saved = (state.googleClientId || '').trim();
      if (saved.includes('.apps.googleusercontent.com')) return saved;
      return '';
    }

    function showAuthGuardMessage(text, isError) {
      const status = document.getElementById('auth-check-status-box');
      const errBox = document.getElementById('login-validation-error');
      if (isError) {
        if (errBox) {
          errBox.textContent = text;
          errBox.classList.remove('hidden');
        }
      } else if (status) {
        status.textContent = text;
        if (errBox) errBox.classList.add('hidden');
      }
    }

    let androidGoogleAuthReady = false;
    let androidGoogleSignInFlight = null;

    function isAndroidTabletApp() {
      const cap = window.Capacitor;
      if (!cap || typeof cap.getPlatform !== 'function' || cap.getPlatform() !== 'android') return false;
      if (typeof cap.isNativePlatform === 'function' && !cap.isNativePlatform()) return false;
      return true;
    }

    function readLocalAppBuild() {
      const build = window.GEPT_APP_BUILD || {};
      const versionCode = Number(build.versionCode || 0);
      return {
        versionCode: Number.isFinite(versionCode) ? versionCode : 0,
        versionName: String(build.versionName || '').trim(),
        builtAt: String(build.builtAt || '').trim()
      };
    }

    function paintAppVersionPill(text, tone) {
      const pill = document.getElementById('app-version-pill');
      if (!pill) return;
      const tones = {
        ok: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40',
        warn: 'bg-amber-500/20 text-amber-100 border-amber-300/50',
        idle: 'bg-slate-700 text-slate-100 border-slate-500'
      };
      pill.textContent = text;
      pill.className = 'inline-flex items-center text-xs px-2 py-0.5 rounded-full border ' + (tones[tone] || tones.idle);
    }

    function setAppVersionBanner(text) {
      const banner = document.getElementById('app-version-banner');
      if (!banner) return;
      if (!text) {
        banner.textContent = '';
        banner.classList.add('hidden');
        document.body.classList.remove('pb-16');
        return;
      }
      banner.textContent = text;
      banner.classList.remove('hidden');
      document.body.classList.add('pb-16');
    }

    function showOutdatedVersionGate(message) {
      const gate = document.getElementById('app-version-gate');
      const body = document.getElementById('app-version-gate-body');
      if (body) body.textContent = message;
      if (!gate) return;
      gate.classList.remove('hidden');
      gate.classList.add('flex');
    }

    function hideOutdatedVersionGate() {
      const gate = document.getElementById('app-version-gate');
      if (!gate) return;
      gate.classList.add('hidden');
      gate.classList.remove('flex');
    }

    async function checkInstalledAppVersion() {
      if (!isAndroidTabletApp()) return;
      const local = readLocalAppBuild();
      const localName = local.versionName || '未標示';
      const localLabel = local.versionCode > 0 ? (localName + '（代碼 ' + local.versionCode + '）') : localName;
      paintAppVersionPill(local.versionCode > 0 ? ('版次 ' + localName) : '版次未標示', 'idle');
      if (!(local.versionCode > 0)) {
        paintAppVersionPill('版次未標示', 'warn');
        setAppVersionBanner('此安裝檔沒有版次。請用 build-apk.bat 重新編譯後再安裝。');
        return;
      }
      const base = resolveGasWebhookUrl();
      if (!base) {
        paintAppVersionPill('版次 ' + localName, 'warn');
        setAppVersionBanner('無法確認是否為最新版：尚未設定試算表網址。目前安裝 ' + localLabel + '。');
        return;
      }
      try {
        const joiner = base.indexOf('?') >= 0 ? '&' : '?';
        const url = base + joiner + 'action=appVersion&t=' + Date.now();
        const resp = await fetch(url, { method: 'GET', cache: 'no-store', redirect: 'follow' });
        const text = await resp.text();
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start < 0 || end <= start) throw new Error('not json');
        const remote = JSON.parse(text.slice(start, end + 1));
        if (!remote || remote.ok === false) throw new Error((remote && remote.error) || 'error');
        if (!remote.found || !(Number(remote.versionCode) > 0)) {
          paintAppVersionPill('版次 ' + localName, 'warn');
          setAppVersionBanner('試算表頁籤「App版次」還沒有最新版紀錄。目前安裝 ' + localLabel + '。請設計者部署 gas/Code.gs 後再編譯，或執行 publish-app-version.bat。');
          return;
        }
        const remoteCode = Number(remote.versionCode);
        const remoteLabel = String(remote.versionName || remoteCode) + '（代碼 ' + remoteCode + '）';
        if (remoteCode > local.versionCode) {
          paintAppVersionPill('版次 ' + localName + '，不是最新', 'warn');
          showOutdatedVersionGate('目前安裝的是 ' + localLabel + '。最新版是 ' + remoteLabel + '。請監考人員安裝新的程式。更新前，題目可能與最新版不同。');
          setAppVersionBanner('這台平板不是最新版。目前安裝 ' + localLabel + '，最新為 ' + remoteLabel + '。');
          return;
        }
        if (remoteCode < local.versionCode) {
          paintAppVersionPill('版次 ' + localName, 'warn');
          setAppVersionBanner('這台平板的版次比試算表還新。目前安裝 ' + localLabel + '，試算表記得是 ' + remoteLabel + '。請設計者確認頁籤「App版次」已寫入，或執行 publish-app-version.bat。');
          return;
        }
        paintAppVersionPill('版次 ' + localName, 'ok');
        setAppVersionBanner('');
      } catch (err) {
        paintAppVersionPill('版次 ' + localName, 'warn');
        setAppVersionBanner('無法確認這台平板是不是最新版。目前安裝 ' + localLabel + '。請檢查網路後重新開啟。');
      }
    }

    function androidPlugin(name) {
      if (!isAndroidTabletApp() || !window.Capacitor) return null;
      const cap = window.Capacitor;
      if ((!cap.Plugins || !cap.Plugins[name]) && typeof cap.registerPlugin === 'function') {
        try { cap.registerPlugin(name); } catch (e) {}
      }
      return (cap.Plugins && cap.Plugins[name]) || null;
    }

    function applyAndroidViewportLock() {
      if (!isAndroidTabletApp()) return;
      document.documentElement.classList.add('native-tablet');
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover');
    }

    function applyAndroidGoogleUser(user, silent) {
      if (!user) return false;
      let email = user.email || '';
      let name = user.displayName || user.name || '';
      let family = user.familyName || user.family_name || '';
      let given = user.givenName || user.given_name || '';
      let picture = user.imageUrl || user.photoUrl || user.picture || '';
      if ((!email || !name) && user.idToken) {
        const payload = decodeGoogleJwtCredential(user.idToken);
        if (payload) {
          if (!email) email = payload.email || '';
          if (!name) name = payload.name || '';
          if (!family) family = payload.family_name || '';
          if (!given) given = payload.given_name || '';
          if (!picture) picture = payload.picture || '';
        }
      }
      if (!email) return false;
      return completeGoogleLogin({
        email: email,
        name: name,
        family_name: family,
        given_name: given,
        picture: picture
      }, 'Google 帳號', !!silent);
    }

    async function ensureAndroidGoogleAuth() {
      const plugin = androidPlugin('GoogleSignIn');
      if (!plugin || typeof plugin.initialize !== 'function') return null;
      if (!androidGoogleAuthReady) {
        await plugin.initialize({
          clientId: resolveGoogleClientId()
        });
        androidGoogleAuthReady = true;
      }
      return plugin;
    }

    function androidGoogleErrorParts(err) {
      if (!err) return { code: '', message: '' };
      if (typeof err === 'string') return { code: '', message: err };
      return {
        code: String(err.code || '').trim(),
        message: String(err.message || err.errorMessage || '').trim()
      };
    }

    async function signInWithAndroidGoogle(silent) {
      if (androidGoogleSignInFlight) return androidGoogleSignInFlight;
      const run = (async () => {
        showAuthGuardMessage(silent ? '正在向 Google 確認這台平板的登入狀態…' : '正在開啟 Google 帳號登入…');
        try {
          const plugin = await ensureAndroidGoogleAuth();
          if (!plugin || typeof plugin.signIn !== 'function') {
            if (!silent) showAuthGuardMessage('這台平板無法使用 Google 登入。', true);
            return false;
          }
          const user = await plugin.signIn();
          const ok = applyAndroidGoogleUser(user, silent);
          if (!ok && !silent) showAuthGuardMessage('Google 沒有回傳有效帳號，請再登入一次。', true);
          return ok;
        } catch (err) {
          const parts = androidGoogleErrorParts(err);
          const blob = (parts.code + ' ' + parts.message).toLowerCase();
          const detail = [parts.message, parts.code].filter((item, index, list) => item && list.indexOf(item) === index).join(' ');
          const noAccount = /no_credential|nocredential|no credential/.test(blob);
          const userCanceled = parts.code === 'SIGN_IN_CANCELED'
            && !/28444|developer|not set up|configuration|sha-?1|oauth/.test(blob);
          if (silent && (userCanceled || noAccount)) return false;
          if (userCanceled) {
            showAuthGuardMessage('已取消 Google 登入。');
            return false;
          }
          if (noAccount) {
            showAuthGuardMessage('這台平板還沒有 Google 帳號。請先到系統設定加入帳號，再按登入。', true);
            return false;
          }
          showAuthGuardMessage('Google 登入沒有完成。請確認已在 Google Cloud 建立 Android 用戶端（套件名 tw.gept.exam.tablet 與這份 APK 的 SHA-1）。' + (detail ? ' ' + detail : ''), true);
          return false;
        }
      })();
      androidGoogleSignInFlight = run;
      try {
        return await run;
      } finally {
        if (androidGoogleSignInFlight === run) androidGoogleSignInFlight = null;
      }
    }

    function signOutAndroidGoogle() {
      const plugin = androidPlugin('GoogleSignIn');
      androidGoogleAuthReady = false;
      if (!plugin || typeof plugin.signOut !== 'function') return;
      try { plugin.signOut(); } catch (e) {}
    }

    function mountGoogleSignIn(showMissingError) {
      if (isAndroidTabletApp()) {
        const fallbackBtn = document.getElementById('btn-google-signin');
        const container = document.getElementById('google-gis-button-container');
        if (fallbackBtn) fallbackBtn.classList.remove('hidden');
        if (container) container.innerHTML = '';
        showAuthGuardMessage('請按下方按鈕，使用 Google 帳號登入。');
        return true;
      }
      const clientId = resolveGoogleClientId();
      const fallbackBtn = document.getElementById('btn-google-signin');
      const container = document.getElementById('google-gis-button-container');
      const gis = window.google && window.google.accounts && window.google.accounts.id;
      if (!clientId || !gis) {
        if (fallbackBtn) fallbackBtn.classList.remove('hidden');
        if (!clientId && showMissingError) {
          showAuthGuardMessage('尚未設定 Google OAuth 用戶端 ID，無法向 Google 取得帳號。請在 src/index.html 的 GOOGLE_OAUTH_CLIENT_ID 填入一次（網頁應用程式用戶端）。', true);
        } else if (!clientId) {
          showAuthGuardMessage('請按下方按鈕，使用您的 Google 帳號登入。');
        } else {
          showAuthGuardMessage('正在載入 Google 登入元件…');
        }
        return false;
      }
      const loggedOut = sessionStorage.getItem('gept_explicit_logout_v5') === '1';
      gis.initialize({
        client_id: clientId,
        auto_select: !loggedOut,
        callback: (response) => {
          const payload = decodeGoogleJwtCredential(response && response.credential);
          if (payload && payload.email) {
            completeGoogleLogin(payload, 'Google 帳號', false);
          } else {
            showAuthGuardMessage('Google 沒有回傳有效帳號，請再登入一次。', true);
          }
        }
      });
      if (container) {
        container.innerHTML = '';
        gis.renderButton(container, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          locale: 'zh_TW',
          width: 320
        });
      }
      if (fallbackBtn) fallbackBtn.classList.add('hidden');
      showAuthGuardMessage('請使用 Google 按鈕登入。已授權過的帳號會直接進入。');
      if (!loggedOut) gis.prompt();
      return true;
    }

    function requestGoogleAccountLogin() {
      try { sessionStorage.removeItem('gept_explicit_logout_v5'); } catch (e) {}
      if (isAndroidTabletApp()) {
        signInWithAndroidGoogle(false);
        return;
      }
      if (window.google && window.google.script && window.google.script.run) {
        showAuthGuardMessage('正在向 Google 帳號確認身分…');
        window.google.script.run
          .withSuccessHandler((res) => {
            if (res && res.email) {
              completeGoogleLogin({
                name: res.name,
                email: res.email,
                picture: res.picture || '',
                family_name: res.family_name || '',
                given_name: res.given_name || ''
              }, 'Google 帳號', false);
            } else {
              showAuthGuardMessage('Google 沒有回傳已登入帳號，請再試一次。', true);
            }
          })
          .withFailureHandler(() => {
            showAuthGuardMessage('無法讀取目前的 Google 帳號。', true);
          })
          .getAuthenticatedGoogleUser();
        return;
      }
      mountGoogleSignIn(true);
    }

    function stayOnGoogleLogin() {
      state.user = { chineseName: '', email: '', picture: '', authMode: '', loggedIn: false };
      renderHeaderAuth();
      updateActiveView();
      const tryMount = (left) => {
        const ready = window.google && window.google.accounts && window.google.accounts.id;
        if (ready || left <= 0) {
          mountGoogleSignIn(false);
          return;
        }
        setTimeout(() => tryMount(left - 1), 250);
      };
      tryMount(12);
    }

    // 開啟頁面時只接受真正的 Google 帳號：本分頁已完成的 Google 登入、OAuth 回傳、Apps Script，或 Google 登入按鈕
    async function verifyGoogleAccountOnStartup() {
      try {
        if (sessionStorage.getItem('gept_explicit_logout_v5') === '1') {
          stayOnGoogleLogin();
          return;
        }

        const savedSession = sessionStorage.getItem('gept_google_auth_session_v5');
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed && parsed.email && parsed.chineseName && parsed.authMode === 'Google 帳號') {
            completeGoogleLogin({ name: parsed.chineseName, email: parsed.email, picture: parsed.picture }, 'Google 帳號', true);
            return;
          }
        }

        if (window.location.hash && (window.location.hash.includes('id_token=') || window.location.hash.includes('access_token='))) {
          const params = new URLSearchParams(window.location.hash.substring(1));
          const idToken = params.get('id_token');
          const accessToken = params.get('access_token');
          if (idToken) {
            const payload = decodeGoogleJwtCredential(idToken);
            if (payload && payload.email) {
              completeGoogleLogin(payload, 'Google 帳號', true);
              history.replaceState(null, '', window.location.pathname + window.location.search);
              return;
            }
          }
          if (accessToken) {
            const resp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (resp.ok) {
              const profile = await resp.json();
              if (profile && profile.email) {
                completeGoogleLogin(profile, 'Google 帳號', true);
                history.replaceState(null, '', window.location.pathname + window.location.search);
                return;
              }
            }
          }
        }

        if (isAndroidTabletApp()) {
          // Sign in with Google 必須由按鈕點擊觸發。開頁就呼叫會被系統當成取消，後面再按也會失敗。
          stayOnGoogleLogin();
          return;
        }

        if (window.google && window.google.script && window.google.script.run) {
          window.google.script.run
            .withSuccessHandler((res) => {
              if (res && res.email) {
                completeGoogleLogin({ name: res.name, email: res.email, picture: res.picture || '' }, 'Google 帳號', true);
              } else {
                stayOnGoogleLogin();
              }
            })
            .withFailureHandler(() => stayOnGoogleLogin())
            .getAuthenticatedGoogleUser();
          return;
        }
      } catch (e) {}

      stayOnGoogleLogin();
    }

    function renderHeaderAuth() {
      const badge = document.getElementById('user-profile-badge');
      const welcomeName = document.getElementById('lobby-welcome-name');
      const examUserName = document.getElementById('exam-user-name');

      if (state.user && state.user.loggedIn && state.user.chineseName) {
        const initial = state.user.chineseName.charAt(0);
        const avatarHtml = state.user.picture
          ? `<img src="${state.user.picture}" alt="${state.user.chineseName}" class="w-7 h-7 rounded-full object-cover border border-indigo-400">`
          : `<div class="w-7 h-7 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">${initial}</div>`;

        badge.innerHTML = `
          <div class="flex items-center gap-2.5">
            ${avatarHtml}
            <div class="text-left">
              <div class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>${state.user.chineseName}</span>
                <span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Google 已驗證</span>
              </div>
              <div class="text-[10px] text-slate-400">中文姓名由 Google 自動提供</div>
            </div>
            <button type="button" id="btn-header-logout" class="ml-2 px-2.5 py-1 rounded bg-rose-600/80 hover:bg-rose-600 text-[11px] font-semibold text-white transition-colors" title="登出並測試未取得 Google 帳號時的強制登入攔截">
              登出帳號
            </button>
          </div>
        `;
        const logoutBtn = document.getElementById('btn-header-logout');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            const runLogout = () => {
              if (state.exam.active) {
                syncCurrentExamToSheet('中途關閉', '考生於測驗中點擊登出，系統自動儲存當下成績');
                stopExamTimer();
                state.exam.active = false;
                const timerBar = document.getElementById('global-timer-bar');
                if (timerBar) {
                  timerBar.classList.add('hidden');
                  timerBar.classList.remove('flex');
                }
              }
              const signedOutEmail = state.user.email;
              if (isAndroidTabletApp()) signOutAndroidGoogle();
              if (window.google && window.google.accounts && window.google.accounts.id) {
                try { window.google.accounts.id.disableAutoSelect(); } catch (e) {}
                if (signedOutEmail) {
                  try { window.google.accounts.id.revoke(signedOutEmail, () => {}); } catch (e) {}
                }
              }
              state.user = { chineseName: '', email: '', picture: '', authMode: '', loggedIn: false };
              try {
                sessionStorage.setItem('gept_explicit_logout_v5', '1');
                sessionStorage.removeItem('gept_google_auth_session_v5');
                localStorage.removeItem('gept_google_verified_account_v4');
              } catch (e) {}
              renderHeaderAuth();
              updateActiveView();
              mountGoogleSignIn(false);
              showToast('已登出 Google 帳號', '請重新使用 Google 帳號登入。', 'amber');
            };
            if (state.exam.active) {
              showExamLeaveGuard({
                title: '誤觸／離開目前程序',
                body: '偵測到可能誤觸登出。確認後會離開測驗，並把這一場存成中途關閉。',
                leaveLabel: '確認登出並離開',
                onLeave: runLogout
              });
              return;
            }
            runLogout();
          });
        }
        if (welcomeName) welcomeName.textContent = state.user.chineseName;
        if (examUserName) examUserName.textContent = state.user.chineseName;
      } else {
        badge.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            <span class="text-xs text-slate-300">未取得 Google 帳號（需登入）</span>
            <button type="button" id="btn-header-login" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white">
              Google 驗證登入
            </button>
          </div>
        `;
        const loginBtn = document.getElementById('btn-header-login');
        if (loginBtn) {
          loginBtn.addEventListener('click', () => {
            updateActiveView();
            if (isAndroidTabletApp()) requestGoogleAccountLogin();
            else mountGoogleSignIn(false);
          });
        }
        if (welcomeName) welcomeName.textContent = '考生';
        if (examUserName) examUserName.textContent = '未登入';
      }
    }

    function updateActiveView() {
      const views = {
        lobby: document.getElementById('view-lobby'),
        practice: document.getElementById('view-practice'),
        exam: document.getElementById('view-exam'),
        records: document.getElementById('view-records')
      };
      const navBtns = {
        lobby: document.getElementById('nav-btn-lobby'),
        practice: document.getElementById('nav-btn-practice'),
        exam: document.getElementById('nav-btn-exam'),
        records: document.getElementById('nav-btn-records')
      };
      const authGuard = document.getElementById('view-auth-guard');

      // 若未能取得已驗證之 Google 帳號，開啟頁面與任何導覽切換皆強制指向登入畫面 (#view-auth-guard)
      if (!state.user || !state.user.loggedIn) {
        Object.values(views).forEach(v => {
          if (v) v.classList.add('hidden');
        });
        if (authGuard) authGuard.classList.remove('hidden');
        Object.keys(navBtns).forEach(k => {
          if (navBtns[k]) {
            navBtns[k].className = 'px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-slate-400 hover:bg-slate-700/40 flex items-center gap-1.5 opacity-75';
          }
        });
      } else {
        if (authGuard) authGuard.classList.add('hidden');
        Object.keys(views).forEach(k => {
          if (!views[k]) return;
          if (k === state.activeTab) views[k].classList.remove('hidden');
          else views[k].classList.add('hidden');
        });
        Object.keys(navBtns).forEach(k => {
          if (!navBtns[k]) return;
          if (k === state.activeTab) {
            navBtns[k].className = 'px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors bg-indigo-600 text-white flex items-center gap-1.5';
          } else {
            navBtns[k].className = 'px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-slate-300 hover:bg-slate-700/60 flex items-center gap-1.5';
          }
        });
      }

      const countPill = document.getElementById('records-count-pill');
      if (countPill) countPill.textContent = String(state.records.length);
      updateMainNavOnScroll();
      syncStickyLayout();
    }

    function updateMainNavOnScroll() {
      const subnav = document.getElementById('site-subnav');
      const nav = document.getElementById('site-main-nav');
      const brand = document.getElementById('site-brand-bar');
      const header = document.querySelector('header');
      if (!subnav || !nav || !brand || !header) return;
      const inStageView = state.activeTab === 'exam' || state.activeTab === 'practice';
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const tabs = document.getElementById(state.activeTab === 'exam' ? 'exam-stage-tabs-sticky' : 'practice-stage-tabs-sticky');
      if (inStageView && tabs && !state.brandBarHidden) {
        const headerBottom = header.getBoundingClientRect().bottom;
        const tabsTop = tabs.getBoundingClientRect().top;
        if (tabsTop > headerBottom + 2) {
          state.stageStickY = Math.max(0, tabsTop + y - header.offsetHeight);
        }
      }
      const stickY = state.stageStickY || 220;
      if (!inStageView || y < 24) {
        state.mainNavHidden = false;
        state.brandBarHidden = false;
      } else {
        if (y > stickY + 120) state.mainNavHidden = true;
        else if (y < stickY + 24) state.mainNavHidden = false;
        if (y > stickY + 420) state.brandBarHidden = true;
        else if (y < stickY + 180) state.brandBarHidden = false;
      }
      const hideNav = !!state.mainNavHidden;
      const hideBrand = !!state.brandBarHidden;
      nav.classList.toggle('is-scroll-hidden', hideNav);
      brand.classList.toggle('is-scroll-hidden', hideBrand);
      subnav.classList.toggle('is-scroll-hidden', hideNav);
      header.classList.toggle('is-scroll-collapsed', hideBrand && hideNav);
      placeExamTimer();
    }

    function placeExamTimer() {
      const timer = document.getElementById('global-timer-bar');
      const tabs = document.getElementById('exam-stage-tabs-sticky');
      if (!timer) return;
      const visible = !timer.classList.contains('hidden') && state.exam && state.exam.active;
      const dock = visible && state.activeTab === 'exam';
      if (tabs) {
        tabs.classList.toggle('timer-docked', dock);
        tabs.style.paddingRight = dock ? ((timer.offsetWidth || 200) + 20) + 'px' : '';
      }
      if (!visible) {
        timer.style.top = '';
        return;
      }
      const header = document.querySelector('header');
      const headerBottom = header && getComputedStyle(header).display !== 'none'
        ? header.getBoundingClientRect().bottom
        : 0;
      let top = headerBottom + 8;
      if (state.activeTab === 'exam' && tabs) {
        const rect = tabs.getBoundingClientRect();
        const timerH = timer.offsetHeight || 44;
        const aligned = rect.top + Math.max(6, (rect.height - timerH) / 2);
        top = Math.max(headerBottom + 6, aligned);
      }
      timer.style.top = Math.round(top) + 'px';
    }

    function syncStickyLayout() {
      const header = document.querySelector('header');
      const headerH = header ? header.offsetHeight : 0;
      document.documentElement.style.setProperty('--site-header-h', headerH + 'px');

      const examTabs = document.getElementById('exam-stage-tabs-sticky');
      const pracTabs = document.getElementById('practice-stage-tabs-sticky');
      const activeTabs = state.activeTab === 'exam' ? examTabs
        : state.activeTab === 'practice' ? pracTabs
        : null;
      const tabsStick = window.innerWidth >= 600;
      const tabsH = tabsStick && activeTabs && !activeTabs.closest('.hidden') ? activeTabs.offsetHeight : 0;
      document.documentElement.style.setProperty('--active-stage-tabs-h', tabsH + 'px');
      fitSheetRecordsHeight();
      placeExamTimer();
    }

    function fitSheetRecordsHeight() {
      const scroller = document.getElementById('sheet-records-scroll');
      const view = document.getElementById('view-records');
      if (!scroller || !view || view.classList.contains('hidden')) return;
      const rect = scroller.getBoundingClientRect();
      const card = scroller.parentElement;
      const cardPadBottom = card ? (parseFloat(window.getComputedStyle(card).paddingBottom) || 0) : 0;
      const main = document.querySelector('main');
      const mainPadBottom = main ? (parseFloat(window.getComputedStyle(main).paddingBottom) || 0) : 0;
      const available = Math.floor(window.innerHeight - rect.top - cardPadBottom - mainPadBottom - 8);
      scroller.style.maxHeight = Math.max(160, available) + 'px';
    }

    // =========================================================================
    // 4. SCORING ENGINE & GOOGLE SHEETS AUTO-SYNC (開始即建檔、關閉必寫入)
    // =========================================================================
    function bankForExam(level) {
      if (state.examPaper && state.examPaper.level === level && state.examPaper.set) {
        return state.examPaper.set;
      }
      return QUESTION_BANK[level];
    }

    function calculateCurrentScores() {
      const level = state.exam.level;
      const bank = bankForExam(level);

      let lCorrect = 0;
      bank.listening.forEach(q => {
        if (state.exam.listeningAnswers[q.id] === q.answer) lCorrect++;
      });
      const lScore = lCorrect * 12; // 10題 × 12分 = 120分

      let rCorrect = 0;
      bank.reading.forEach(q => {
        if (state.exam.readingAnswers[q.id] === q.answer) rCorrect++;
      });
      const rScore = rCorrect * 12; // 10題 × 12分 = 120分

      // Speaking score (average of 5 items, or default based on completed items)
      let sSum = 0;
      let sAnswered = 0;
      bank.speaking.forEach(q => {
        const sc = state.exam.speakingScores[q.id];
        if (sc && sc.score100 > 0) {
          sSum += sc.score100;
          sAnswered++;
        }
      });
      const sScore = sAnswered > 0 ? Math.round(sSum / bank.speaking.length) : 0;

      // Writing auto evaluation
      const wScore = evaluateWritingScore(false);

      // Progress percentage
      const totalItems = bank.listening.length + bank.reading.length + bank.speaking.length + (level === '初級' ? 4 : 2);
      let answeredItems = Object.keys(state.exam.listeningAnswers).length
                        + Object.keys(state.exam.readingAnswers).length
                        + sAnswered;
      if (level === '初級') {
        if ((state.exam.writingAnswers.s1 || '').trim()) answeredItems++;
        if ((state.exam.writingAnswers.s2 || '').trim()) answeredItems++;
        if ((state.exam.writingAnswers.s3 || '').trim()) answeredItems++;
        if ((state.exam.writingAnswers.essay || '').trim()) answeredItems++;
      } else {
        if ((state.exam.writingAnswers.trans || '').trim()) answeredItems++;
        if ((state.exam.writingAnswers.essay || '').trim()) answeredItems++;
      }
      const progressPct = Math.min(100, Math.round((answeredItems / totalItems) * 100)) + '%';

      return { lScore, rScore, sScore, wScore, lCorrect, rCorrect, sAnswered, progressPct };
    }

    function evaluateWritingScore(showFeedbackToast) {
      const level = state.exam.level;
      const w = state.exam.writingAnswers;
      const bankW = bankForExam(level).writing;

      if (level === '初級') {
        // 3 sentences (0-2 pts each, max 6) + 1 paragraph (0-5 band)
        let sentPoints = 0;
        const sInputs = [w.s1 || '', w.s2 || '', w.s3 || ''];
        bankW.sentences.forEach((sq, idx) => {
          const text = sInputs[idx].toLowerCase().trim();
          if (!text) return;
          let matched = 0;
          sq.keywords.forEach(kw => {
            if (text.includes(kw)) matched++;
          });
          if (matched >= Math.ceil(sq.keywords.length * 0.75)) sentPoints += 2;
          else if (matched >= 2) sentPoints += 1;
        });

        const essayText = (w.essay || '').trim();
        const wordCount = essayText ? essayText.split(/\s+/).length : 0;
        let essayBand = 0;
        if (wordCount >= 45) essayBand = 4.5;
        else if (wordCount >= 30) essayBand = 4.0;
        else if (wordCount >= 18) essayBand = 3.0;
        else if (wordCount >= 8) essayBand = 2.0;
        else if (wordCount > 0) essayBand = 1.0;

        // Official LTTC Elementary formula: ((Part1 / 6) + (Part2 / 5)) * 50
        const totalW = Math.round(((sentPoints / 6) + (essayBand / 5)) * 50);
        w.gradedScore = totalW;
        w.feedback = `單句得分 ${sentPoints}/6 分、段落寫作 ${essayBand}/5 級分（字數 ${wordCount} 字）→ 換算百分制 ${totalW} 分（初級及格門檻 70 分）`;
        if (showFeedbackToast) {
          showToast('AI 寫作評分完成（初級）', w.feedback, 'emerald');
          renderWritingSection();
        }
        return totalW;
      } else {
        // Intermediate: Translation (40%, 0-5 band * 8) + Essay (60%, 0-5 band * 12)
        const transText = (w.trans || '').toLowerCase().trim();
        let transBand = 0;
        if (transText) {
          let matched = 0;
          bankW.translation.keywords.forEach(kw => {
            if (transText.includes(kw)) matched++;
          });
          if (matched >= 6) transBand = 4.5;
          else if (matched >= 4) transBand = 4.0;
          else if (matched >= 2) transBand = 3.0;
          else transBand = 2.0;
        }

        const essayText = (w.essay || '').trim();
        const wordCount = essayText ? essayText.split(/\s+/).length : 0;
        let essayBand = 0;
        if (wordCount >= 80) essayBand = 4.5;
        else if (wordCount >= 55) essayBand = 4.0;
        else if (wordCount >= 35) essayBand = 3.0;
        else if (wordCount >= 15) essayBand = 2.0;
        else if (wordCount > 0) essayBand = 1.0;

        const totalW = Math.round(transBand * 8 + essayBand * 12);
        w.gradedScore = totalW;
        w.feedback = `中譯英 ${transBand}/5 級分 (${Math.round(transBand * 8)}分)、英文作文 ${essayBand}/5 級分 (${Math.round(essayBand * 12)}分，字數 ${wordCount} 字) → 合計 ${totalW} 分（中級及格門檻 80 分）`;
        if (showFeedbackToast) {
          showToast('AI 寫作評分完成（中級）', w.feedback, 'emerald');
          renderWritingSection();
        }
        return totalW;
      }
    }

    function updateLiveScoreStrip() {
      const scores = calculateCurrentScores();
      document.getElementById('live-score-l').textContent = String(scores.lScore);
      document.getElementById('live-score-r').textContent = String(scores.rScore);
      document.getElementById('live-score-stage1').textContent = String(scores.lScore + scores.rScore);
      document.getElementById('live-score-s').textContent = String(scores.sScore);
      document.getElementById('live-score-w').textContent = String(scores.wScore);
      document.getElementById('live-checkpoint-label').textContent = state.exam.lastCheckpoint;

      const lCount = Object.keys(state.exam.listeningAnswers).length;
      const rCount = Object.keys(state.exam.readingAnswers).length;
      document.getElementById('badge-progress-listening').textContent = `${lCount} / 10 題`;
      document.getElementById('badge-progress-reading').textContent = `${rCount} / 10 題`;
      document.getElementById('badge-progress-speaking').textContent = `${scores.sAnswered} / 5 題`;
      document.getElementById('badge-progress-writing').textContent = `${scores.wScore} 分`;
    }

    let sheetWriteChain = Promise.resolve();

    function enqueueSheetWrite(task) {
      const run = sheetWriteChain.then(task, task);
      sheetWriteChain = run.then(() => {}, () => {});
      return run;
    }

    function setSheetSyncIndicator(text, ok) {
      const indicator = document.getElementById('exam-autosave-indicator');
      if (indicator) {
        indicator.textContent = text;
        indicator.className = ok
          ? 'text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium'
          : 'text-xs text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full font-medium';
      }
      if (ok) {
        const badge = document.getElementById('sheet-link-status');
        if (badge) badge.textContent = '🟢 已寫入 Google 試算表：全民英檢成績';
      }
    }

    function toastSheetResult(ok, successTitle, successMessage, successTone, failTitle) {
      if (ok) showToast(successTitle, successMessage, successTone || 'emerald');
      else showToast(failTitle, state.lastSheetError || '成績已記在本機預覽。請先部署 gas/Code.gs，並把網頁應用程式網址填入 GAS_WEBAPP_URL。', 'amber');
    }

    function resolveGasWebhookUrl() {
      const fromConst = (GAS_WEBAPP_URL || '').trim();
      if (fromConst.startsWith('https://')) return fromConst;
      const saved = (state.webhookUrl || '').trim();
      if (saved.startsWith('https://')) return saved;
      return '';
    }

    function postGradeToGas(payload, useBeacon) {
      const url = resolveGasWebhookUrl();
      if (!url) return Promise.resolve(false);
      try {
        const jsonStr = JSON.stringify(payload);
        if (useBeacon && navigator.sendBeacon) {
          const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
          return Promise.resolve(navigator.sendBeacon(url, blob));
        }
        return fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: jsonStr,
          keepalive: true
        }).then(() => true).catch(() => false);
      } catch (e) {
        return Promise.resolve(false);
      }
    }

    function escapeHtml(text) {
      return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function choiceIndex(value) {
      if (value === undefined || value === null || value === '') return null;
      const n = Number(value);
      return Number.isFinite(n) ? n : null;
    }

    function buildChoiceReview(subject, q, idx, chosenRaw, carriedPassage) {
      const options = (q.options || []).slice();
      const chosenIndex = choiceIndex(chosenRaw);
      const correctIndex = choiceIndex(q.answer);
      let result = '未作答';
      if (chosenIndex != null) result = chosenIndex === correctIndex ? '正確' : '錯誤';
      const passageText = q.passage || carriedPassage || '';
      return {
        subject: subject,
        no: idx + 1,
        id: q.id || '',
        part: q.part || '',
        stem: [passageText, q.audioText, q.prompt].filter(Boolean).join('\n'),
        options: options,
        correctIndex: correctIndex,
        chosenIndex: chosenIndex,
        correctLabel: '正確答案',
        correct: options[correctIndex] || '',
        chosen: chosenIndex == null ? '未作答' : (options[chosenIndex] || '未作答'),
        result: result
      };
    }

    function buildTextReview(subject, no, id, part, stem, correctLabel, correct, chosen, result, note) {
      const text = (chosen || '').trim();
      return {
        subject: subject,
        no: no,
        id: id || '',
        part: part || '',
        stem: stem || '',
        options: [],
        correctIndex: null,
        chosenIndex: null,
        correctLabel: correctLabel,
        correct: correct || '',
        chosen: text || '未作答',
        result: result || (text ? '已作答' : '未作答'),
        note: note || ''
      };
    }

    function buildExamReview() {
      const level = state.exam.level;
      const bank = bankForExam(level);
      if (!bank) return { round: 0, items: [] };
      const items = [];

      (bank.listening || []).forEach((q, idx) => {
        items.push(buildChoiceReview('聽力', q, idx, state.exam.listeningAnswers[q.id], ''));
      });

      let passage = '';
      (bank.reading || []).forEach((q, idx) => {
        if (q.passage) passage = q.passage;
        items.push(buildChoiceReview('閱讀', q, idx, state.exam.readingAnswers[q.id], passage));
      });

      (bank.speaking || []).forEach((q, idx) => {
        const sc = state.exam.speakingScores[q.id] || {};
        const transcript = (sc.transcript || '').trim();
        const openEnded = /回答|看圖|敘述/.test(q.part || '');
        const printed = (q.printedQuestions || []).join('\n');
        const stem = [printed, q.audioText, q.instruction].filter(Boolean).join('\n');
        let result = '未作答';
        if (transcript || sc.recorded) {
          result = sc.score100 > 0
            ? `流利 ${sc.fluencyBand}/5、文法 ${sc.grammarBand}/5，${sc.score100}分`
            : '已作答';
        }
        const reference = openEnded
          ? ('開放作答' + (q.expectedKeywords && q.expectedKeywords.length ? '。評分會看這些字：' + q.expectedKeywords.join(', ') : ''))
          : (q.audioText || '');
        items.push(buildTextReview(
          '口說',
          idx + 1,
          q.id,
          q.part,
          stem,
          openEnded ? '參考說明' : '應複誦或朗讀',
          reference,
          transcript || (sc.recorded ? '已錄音，沒有留下辨識文字' : ''),
          result
        ));
      });

      const w = state.exam.writingAnswers || {};
      const bankW = bank.writing || {};
      if (level === '初級' && bankW.sentences) {
        [w.s1 || '', w.s2 || '', w.s3 || ''].forEach((value, idx) => {
          const sq = bankW.sentences[idx];
          if (!sq) return;
          items.push(buildTextReview('寫作', idx + 1, sq.id, sq.type || '單句寫作', sq.prompt, '參考答案', sq.sample, value, ''));
        });
      }
      if (level !== '初級' && bankW.translation) {
        items.push(buildTextReview('寫作', 1, bankW.translation.id, '中譯英', bankW.translation.prompt, '參考譯文', bankW.translation.sample, w.trans, ''));
      }
      if (bankW.essay) {
        items.push(buildTextReview(
          '寫作',
          level === '初級' ? 4 : 2,
          bankW.essay.id,
          level === '初級' ? '段落寫作' : '英文作文',
          bankW.essay.prompt,
          '參考範文',
          bankW.essay.sample,
          w.essay,
          (w.essay || '').trim() ? '已作答' : '未作答',
          w.feedback || ''
        ));
      }

      return {
        round: state.examPaper && state.examPaper.round ? state.examPaper.round : 0,
        items: items
      };
    }

    function clipReviewForSheet(review) {
      if (!review || !Array.isArray(review.items) || !review.items.length) return null;
      const pack = (stemMax, answerMax) => ({
        round: review.round || 0,
        items: review.items.slice(0, 80).map((item) => ({
          subject: item.subject,
          no: item.no,
          part: item.part,
          stem: String((item.stem || '') + (item.note ? '\n' + item.note : '')).slice(0, stemMax),
          correct: String(item.correct || '').slice(0, answerMax),
          chosen: String(item.chosen || '').slice(0, answerMax),
          result: String(item.result || '').slice(0, 200)
        }))
      });
      let packed = pack(1200, 800);
      if (JSON.stringify(packed).length > 48000) packed = pack(400, 240);
      return packed;
    }

    // 本機預覽表先更新，再以已登入 Google 帳號寫入試算表「全民英檢成績(自動)」同一 Session_ID 列
    function syncCurrentExamToSheet(statusValue, customNote, useBeacon) {
      if (!state.exam.sessionId) return Promise.resolve(false);
      const scores = calculateCurrentScores();
      const nowStr = formatNow(new Date());
      const elapsedMin = state.exam.startTimeMs
        ? Math.min(30, Math.round(((Date.now() - state.exam.startTimeMs) / 60000) * 10) / 10)
        : 0.1;

      const payload = {
        sessionId: state.exam.sessionId,
        userName: state.user.chineseName || '未命名考生',
        level: state.exam.level,
        status: statusValue,
        startTime: state.exam.startTimeStr,
        endTime: statusValue === '進行中' || statusValue === '進行中(背景自動備份)' ? '-' : nowStr,
        durationMin: elapsedMin,
        progressPct: scores.progressPct,
        lScore: scores.lScore,
        rScore: scores.rScore,
        sScore: scores.sScore,
        wScore: scores.wScore,
        lastCheckpoint: state.exam.lastCheckpoint,
        notes: customNote || `聽力${scores.lCorrect}/10、閱讀${scores.rCorrect}/10、口說${scores.sAnswered}/5、寫作${scores.wScore}分`
      };
      const review = buildExamReview();
      const localRecord = Object.assign({}, payload, { review: review });
      payload.review = clipReviewForSheet(review);

      const existingIdx = state.records.findIndex(r => r.sessionId === payload.sessionId);
      if (existingIdx >= 0) {
        if (!localRecord.review && state.records[existingIdx].review) {
          localRecord.review = state.records[existingIdx].review;
        }
        state.records[existingIdx] = localRecord;
      } else {
        state.records.unshift(localRecord);
      }
      saveRecordsToStorage();
      renderSheetRecordsTable();

      const countPill = document.getElementById('records-count-pill');
      if (countPill) countPill.textContent = String(state.records.length);
      setSheetSyncIndicator(`正在寫入 Google 試算表（${statusValue}）…`, true);

      return enqueueSheetWrite(async () => {
        if (!resolveGasWebhookUrl()) {
          state.lastSheetError = '成績已記在本機。雲端寫入請部署 gas/Code.gs（執行身分選「我」、存取權選「所有人」），再把網址填入 GAS_WEBAPP_URL。';
          setSheetSyncIndicator('成績已記在本機，尚未連上 Google 試算表', false);
          return false;
        }
        const sent = await postGradeToGas(payload, !!useBeacon);
        if (sent) {
          state.lastSheetError = '';
          setSheetSyncIndicator(`✓ 已送出至 Google 試算表（${statusValue} @ ${nowStr}）`, true);
          return true;
        }
        state.lastSheetError = '送出至 Google 試算表失敗，成績仍保留在本機預覽';
        setSheetSyncIndicator(`尚未寫入 Google 試算表：${state.lastSheetError}`, false);
        return false;
      });
    }

    // Evaluate Excel/Sheets Equivalent Columns L, M, P, Q
    function evaluateRecordFormulas(rec) {
      const stage1Total = Number(rec.lScore || 0) + Number(rec.rScore || 0);
      const stage1Pass = (stage1Total >= 160 && Number(rec.lScore) >= 72 && Number(rec.rScore) >= 72) ? '通過' : '未通過';
      const wThreshold = rec.level === '初級' ? 70 : 80;
      const stage2Pass = (Number(rec.sScore) >= 80 && Number(rec.wScore) >= wThreshold) ? '通過' : '未通過';

      let overall = '未達通過標準';
      if (rec.status === '中途關閉') overall = '中途離開(未完試)';
      else if (rec.status === '進行中') overall = '測驗進行中';
      else if (stage1Pass === '通過' && stage2Pass === '通過') overall = '兩階段合格';
      else if (stage1Pass === '通過' && stage2Pass === '未通過') overall = '初試通過/複試待加強';

      return { stage1Total, stage1Pass, stage2Pass, overall };
    }

    function renderSheetRecordsTable() {
      const tbody = document.getElementById('sheet-records-tbody');
      if (!tbody) return;
      tbody.innerHTML = '';

      state.records.forEach(rec => {
        const calc = evaluateRecordFormulas(rec);
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors';

        const statusStyle = rec.status === '已完成' ? 'bg-emerald-100 text-emerald-800'
                          : rec.status === '中途關閉' ? 'bg-amber-100 text-amber-800'
                          : rec.status === '進行中' ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-blue-100 text-blue-800';

        const pass1Style = calc.stage1Pass === '通過' ? 'text-emerald-700 font-bold' : 'text-rose-600';
        const pass2Style = calc.stage2Pass === '通過' ? 'text-emerald-700 font-bold' : 'text-rose-600';

        const sid = escapeHtml(rec.sessionId);
        const reviewOpen = state.openReviewId === rec.sessionId;
        tr.innerHTML = `
          <td class="py-2.5 px-3">
            <div class="font-mono font-semibold text-slate-900">${sid}</div>
            <button type="button" data-review-session="${sid}"
              class="mt-1 px-2 py-0.5 rounded-md border text-[11px] font-bold ${reviewOpen ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}">
              ${reviewOpen ? '收合回顧' : '回顧題目'}
            </button>
          </td>
          <td class="py-2.5 px-3 font-bold text-slate-900">${rec.userName}</td>
          <td class="py-2.5 px-3 font-semibold">${rec.level}</td>
          <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusStyle}">${rec.status}</span></td>
          <td class="py-2.5 px-3 font-mono text-slate-600">${rec.startTime}</td>
          <td class="py-2.5 px-3 font-mono text-slate-600">${rec.endTime}</td>
          <td class="py-2.5 px-3 text-right font-mono">${rec.durationMin}</td>
          <td class="py-2.5 px-3 text-right font-mono">${rec.progressPct}</td>
          <td class="py-2.5 px-3 text-right font-bold">${rec.lScore}</td>
          <td class="py-2.5 px-3 text-right font-bold">${rec.rScore}</td>
          <td class="py-2.5 px-3 text-right font-bold text-indigo-700 bg-indigo-50/40">${calc.stage1Total}</td>
          <td class="py-2.5 px-3 ${pass1Style}">${calc.stage1Pass}</td>
          <td class="py-2.5 px-3 text-right font-bold">${rec.sScore}</td>
          <td class="py-2.5 px-3 text-right font-bold">${rec.wScore}</td>
          <td class="py-2.5 px-3 ${pass2Style}">${calc.stage2Pass}</td>
          <td class="py-2.5 px-3 font-bold text-slate-900">${calc.overall}</td>
          <td class="py-2.5 px-3 text-slate-600">${rec.lastCheckpoint}</td>
          <td class="py-2.5 px-3 text-slate-500 max-w-xs truncate" title="${rec.notes}">${rec.notes}</td>
        `;
        tbody.appendChild(tr);
      });
      renderRecordReview(false);
    }

    function reviewResultClass(result) {
      if (result === '正確') return 'bg-emerald-100 text-emerald-800';
      if (result === '錯誤') return 'bg-rose-100 text-rose-800';
      if (result === '未作答') return 'bg-slate-200 text-slate-600';
      return 'bg-indigo-100 text-indigo-800';
    }

    function reviewOptionsHtml(item) {
      if (!item.options || !item.options.length) return '';
      return '<ul class="mt-2 space-y-1">' + item.options.map((opt, i) => {
        const isCorrect = i === item.correctIndex;
        const isChosen = i === item.chosenIndex;
        let cls = 'text-slate-700';
        let tag = '';
        if (isCorrect && isChosen) {
          cls = 'text-emerald-900 bg-emerald-100';
          tag = '正確，考生所選';
        } else if (isCorrect) {
          cls = 'text-emerald-800 bg-emerald-50';
          tag = '正確答案';
        } else if (isChosen) {
          cls = 'text-rose-800 bg-rose-50';
          tag = '考生所選';
        }
        return `<li class="px-2 py-1 rounded text-xs leading-relaxed ${cls}">${escapeHtml(opt)}${tag ? ` <span class="text-[10px] font-bold">（${tag}）</span>` : ''}</li>`;
      }).join('') + '</ul>';
    }

    function reviewTextBlock(label, text) {
      return `<div class="mt-2">
        <div class="text-[11px] font-bold text-slate-500">${escapeHtml(label)}</div>
        <div class="mt-0.5 text-xs text-slate-800 whitespace-pre-line leading-relaxed">${escapeHtml(text || '—')}</div>
      </div>`;
    }

    function renderRecordReview(scrollIntoView) {
      const panel = document.getElementById('record-review-panel');
      const title = document.getElementById('record-review-title');
      const meta = document.getElementById('record-review-meta');
      const body = document.getElementById('record-review-body');
      if (!panel || !title || !meta || !body) return;
      const rec = state.openReviewId
        ? state.records.find(item => item.sessionId === state.openReviewId)
        : null;
      if (!rec) {
        state.openReviewId = '';
        panel.classList.add('hidden');
        body.innerHTML = '';
        return;
      }
      const review = rec.review && Array.isArray(rec.review.items) ? rec.review : null;
      const roundText = review && review.round ? `第 ${review.round} 回` : '';
      title.textContent = `${rec.userName || '考生'}　${rec.level || ''} ${roundText}`.trim();
      meta.textContent = `${rec.sessionId}　${rec.status || ''}　${rec.startTime || ''}–${rec.endTime || ''}`;
      if (!review || !review.items.length) {
        body.innerHTML = '<p class="text-xs text-slate-600 leading-relaxed">這筆沒有留下當次題目與作答。結構範例不會有回顧；由此機開始的正式測驗，會在作答、交卷或關閉時保留題目與答案。</p>';
      } else {
        const subjects = ['聽力', '閱讀', '口說', '寫作'];
        body.innerHTML = subjects.map((subject) => {
          const list = review.items.filter(item => item.subject === subject);
          if (!list.length) return '';
          const cards = list.map((item) => {
            const choiceList = item.options && item.options.length;
            return `<article class="rounded-xl bg-white border border-slate-200 p-3">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <div class="text-[11px] font-bold text-indigo-700">${escapeHtml(item.part || subject)}</div>
                  <div class="text-sm font-bold text-slate-900">第 ${escapeHtml(item.no)} 題</div>
                </div>
                <span class="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold ${reviewResultClass(item.result)}">${escapeHtml(item.result || '')}</span>
              </div>
              ${reviewTextBlock('題目', item.stem)}
              ${choiceList ? reviewOptionsHtml(item) : reviewTextBlock(item.correctLabel || '參考答案', item.correct) + reviewTextBlock('考生作答', item.chosen)}
              ${item.note ? reviewTextBlock('評分', item.note) : ''}
            </article>`;
          }).join('');
          return `<section class="space-y-2">
            <h4 class="text-xs font-bold text-slate-800">${subject}（${list.length} 題）</h4>
            <div class="grid gap-2">${cards}</div>
          </section>`;
        }).join('');
      }
      panel.classList.remove('hidden');
      if (scrollIntoView) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // =========================================================================
    // 5. WEB AUDIO & SPEECH SYNTHESIS FOR LISTENING & STAGE 2 AUDIO-LISTENING
    // =========================================================================
    function playBeepTone(freq, durationMs) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq || 880;
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (durationMs || 200) / 1000);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (durationMs || 200) / 1000);
      } catch (e) {}
    }

    let androidSpeakToken = null;
    let androidTtsInstallPrompted = false;

    function stopEnglishSpeech() {
      androidSpeakToken = null;
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      if (!isAndroidTabletApp()) return;
      const plugin = androidPlugin('TextToSpeech');
      if (plugin && typeof plugin.stop === 'function') {
        try { plugin.stop(); } catch (e) {}
      }
    }

    async function findAndroidEnglishLang(plugin) {
      const candidates = ['en-US', 'en-GB', 'en'];
      for (let i = 0; i < candidates.length; i += 1) {
        try {
          const result = await plugin.isLanguageSupported({ lang: candidates[i] });
          if (result && result.supported) return candidates[i];
        } catch (e) {}
      }
      try {
        const result = await plugin.getSupportedLanguages();
        const languages = (result && result.languages) || [];
        const english = languages.find((lang) => /^en([-_]|$)/i.test(String(lang || '')));
        return english || '';
      } catch (e) {
        return '';
      }
    }

    function speakEnglishOnTablet(text, rate, onEndCallback) {
      const token = {};
      androidSpeakToken = token;
      let finished = false;
      const done = () => {
        if (finished || androidSpeakToken !== token) return;
        finished = true;
        androidSpeakToken = null;
        if (onEndCallback) onEndCallback();
      };
      const plugin = androidPlugin('TextToSpeech');
      if (!plugin || typeof plugin.speak !== 'function') {
        showToast('平板沒有英文語音', '請到系統設定安裝文字轉語音的英文語音後再播放。', 'amber');
        setTimeout(done, 400);
        return;
      }
      const spoken = String(text || '').trim();
      const estMs = Math.max(12000, Math.min(60000, spoken.length * 140 + 2500));
      const timer = setTimeout(() => {
        try { plugin.stop(); } catch (e) {}
        done();
      }, estMs);
      const fail = (message) => {
        clearTimeout(timer);
        showToast('平板沒有唸出英文', message, 'amber');
        done();
      };
      const speakWithLang = (lang, attempt) => {
        if (androidSpeakToken !== token) return;
        plugin.speak({
          text: spoken,
          lang: lang,
          rate: Math.max(0.6, Math.min(1.2, rate || 0.95)),
          pitch: 1,
          volume: 1
        }).then(() => {
          clearTimeout(timer);
          done();
        }).catch((err) => {
          if (androidSpeakToken !== token) return;
          const message = String((err && (err.message || err.errorMessage)) || err || '');
          if (/not yet initialized|not available/i.test(message) && attempt < 6) {
            setTimeout(() => speakWithLang(lang, attempt + 1), 400);
            return;
          }
          if (/not supported/i.test(message)) {
            findAndroidEnglishLang(plugin).then((fallback) => {
              if (androidSpeakToken !== token) return;
              if (fallback && fallback !== lang) {
                speakWithLang(fallback, attempt + 1);
                return;
              }
              if (!androidTtsInstallPrompted && typeof plugin.openInstall === 'function') {
                androidTtsInstallPrompted = true;
                try { plugin.openInstall(); } catch (e) {}
              }
              fail('這台平板還沒有英文語音。請在「文字轉語音輸出」安裝 Google 文字轉語音的英文（美國）後再播放。');
            });
            return;
          }
          fail('英文沒有播完。請確認媒體音量已打開，並已安裝英文文字轉語音。');
        });
      };
      setTimeout(() => speakWithLang('en-US', 0), 180);
    }

    function speakEnglishOnce(text, rate, onEndCallback) {
      playBeepTone(660, 140);
      if (isAndroidTabletApp()) {
        speakEnglishOnTablet(text, rate, onEndCallback);
        return;
      }
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.lang = 'en-US';
          utter.rate = rate || 0.95;
          let finished = false;
          const done = () => {
            if (finished) return;
            finished = true;
            if (onEndCallback) onEndCallback();
          };
          utter.onend = done;
          utter.onerror = done;
          window.speechSynthesis.speak(utter);
          // Fallback timeout in case sandboxed iframe speechSynthesis doesn't fire onend
          const estMs = Math.max(2200, Math.min(8000, text.length * 55));
          setTimeout(done, estMs);
          return;
        } catch (e) {}
      }
      setTimeout(() => {
        if (onEndCallback) onEndCallback();
      }, 2200);
    }

    // One live microphone session for practice and stage-2 speaking.
    let activeMicCapture = null;

    function startEnglishMicCapture(options) {
      const seconds = Math.max(3, Number(options.seconds) || 15);
      const onUpdate = typeof options.onUpdate === 'function' ? options.onUpdate : function () {};
      const onStart = typeof options.onStart === 'function' ? options.onStart : function () {};
      let stopped = false;
      let settled = false;
      let started = false;
      let stream = null;
      let recorder = null;
      let recognition = null;
      let nativeSpeechPlugin = null;
      let timer = null;
      let remaining = seconds;
      let finalText = '';
      let interimText = '';
      let recognitionSupported = false;
      let nativeSpeechError = null;
      const chunks = [];
      let resolveDone;
      const done = new Promise((resolve) => { resolveDone = resolve; });

      const transcriptNow = () => (finalText + ' ' + interimText).replace(/\s+/g, ' ').trim();

      function settle(payload) {
        if (settled) return;
        settled = true;
        resolveDone(payload);
      }

      let lastAbsorbedSpeech = '';

      function firstNativeMatch(data) {
        const matches = data && data.matches;
        if (!matches) return '';
        if (Array.isArray(matches)) return String(matches[0] || '');
        if (typeof matches === 'object' && matches[0]) return String(matches[0]);
        return '';
      }

      function absorbInterimSpeech() {
        const piece = interimText.trim();
        if (!piece) return;
        if (!finalText.endsWith(piece)) {
          finalText = (finalText + ' ' + piece).replace(/\s+/g, ' ').trim();
        }
        lastAbsorbedSpeech = piece;
        interimText = '';
      }

      function applyNativeMatch(data) {
        const text = firstNativeMatch(data).trim();
        if (!text || text === lastAbsorbedSpeech) return;
        interimText = text;
        onUpdate({ transcript: transcriptNow(), remaining });
      }

      function releaseStream() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        if (recognition) {
          recognition.onend = null;
          recognition.onresult = null;
          recognition.onerror = null;
          try { recognition.abort(); } catch (e) {}
          recognition = null;
        }
        if (nativeSpeechPlugin) {
          const plugin = nativeSpeechPlugin;
          nativeSpeechPlugin = null;
          try { plugin.stop(); } catch (e) {}
          try { plugin.removeAllListeners(); } catch (e) {}
        }
        if (stream) {
          stream.getTracks().forEach((track) => {
            try { track.stop(); } catch (e) {}
          });
          stream = null;
        }
      }

      function closeRecorder() {
        const publish = () => {
          if (settled) return;
          const mime = ((recorder && recorder.mimeType) || 'audio/webm').split(';')[0] || 'audio/webm';
          const blob = new Blob(chunks, { type: mime });
          const audioUrl = blob.size ? URL.createObjectURL(blob) : '';
          absorbInterimSpeech();
          const transcript = transcriptNow();
          releaseStream();
          if (!started && !audioUrl && !transcript) {
            settle({ transcript: '', audioUrl: '', error: 'cancelled' });
            return;
          }
          settle({ transcript, audioUrl, recognitionSupported });
        };
        if (recorder && recorder.state === 'recording') {
          recorder.onstop = publish;
          try {
            recorder.stop();
          } catch (e) {
            publish();
          }
          return;
        }
        publish();
      }

      function finish() {
        if (stopped) return;
        stopped = true;
        session.stopping = true;
        if (recognition) {
          recognition.onend = null;
          try { recognition.stop(); } catch (e) {}
        }
        const waitForNativeResult = !!nativeSpeechPlugin;
        if (nativeSpeechPlugin) {
          try { nativeSpeechPlugin.stop(); } catch (e) {}
        }
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        setTimeout(closeRecorder, waitForNativeResult ? 1500 : (started ? 280 : 0));
      }

      const session = {
        done,
        stopping: false,
        owner: options.owner || '',
        qid: options.qid || '',
        stop: finish
      };

      function mediaFailure(err, recorderFailed) {
        const name = err && err.name;
        const denied = name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError';
        if (recorderFailed) {
          return { error: 'mic-failed', transcript: '', audioUrl: '', message: '麥克風已開啟，但無法開始錄音。' };
        }
        return {
          error: denied ? 'mic-denied' : 'mic-failed',
          transcript: '',
          audioUrl: '',
          message: denied
            ? '瀏覽器沒有麥克風權限。請點網址列的麥克風圖示，改成允許後再錄一次。'
            : '找不到可用的麥克風，請確認裝置已連接並且沒有被其他程式占用。'
        };
      }

      async function prepareAndroidSpeech() {
        const plugin = androidPlugin('SpeechRecognition');
        if (!plugin || typeof plugin.start !== 'function') {
          nativeSpeechError = { error: 'unsupported', transcript: '', audioUrl: '', message: '這台平板沒有語音辨識功能。' };
          return null;
        }
        try {
          const avail = await plugin.available();
          if (avail && avail.available === false) {
            nativeSpeechError = { error: 'unsupported', transcript: '', audioUrl: '', message: '這台平板沒有語音辨識功能。' };
            return null;
          }
        } catch (e) {}
        try {
          const perm = await plugin.requestPermissions();
          const state = perm && perm.speechRecognition;
          if (state === 'denied') {
            nativeSpeechError = {
              error: 'mic-denied',
              transcript: '',
              audioUrl: '',
              message: '平板沒有麥克風權限。請到系統設定允許本程式使用麥克風後再錄一次。'
            };
            return null;
          }
        } catch (e) {
          nativeSpeechError = {
            error: 'mic-denied',
            transcript: '',
            audioUrl: '',
            message: '平板沒有麥克風權限。請到系統設定允許本程式使用麥克風後再錄一次。'
          };
          return null;
        }
        return plugin;
      }

      async function beginAndroidSpeechRecognition(plugin) {
        const startOptions = {
          language: 'en-US',
          maxResults: 5,
          partialResults: true,
          popup: false
        };
        try {
          if (typeof plugin.removeAllListeners === 'function') await plugin.removeAllListeners();
          await plugin.addListener('partialResults', (data) => {
            applyNativeMatch(data);
          });
          await plugin.addListener('listeningState', (data) => {
            if (!data || data.status !== 'stopped' || stopped) return;
            setTimeout(() => {
              if (stopped || nativeSpeechPlugin !== plugin) return;
              absorbInterimSpeech();
              plugin.start(startOptions).catch(() => {});
            }, 450);
          });
          await plugin.start(startOptions);
          nativeSpeechPlugin = plugin;
          recognitionSupported = true;
          started = true;
          return true;
        } catch (e) {
          nativeSpeechError = {
            error: 'mic-failed',
            transcript: '',
            audioUrl: '',
            message: '無法啟動平板語音辨識，請確認已安裝 Google 語音服務後再錄一次。'
          };
          return false;
        }
      }

      (async () => {
        const preferNativeSpeech = isAndroidTabletApp();
        const canRecord = window.isSecureContext && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && typeof window.MediaRecorder === 'function';
        let mediaError = null;
        let speechPlugin = null;

        if (preferNativeSpeech) {
          speechPlugin = await prepareAndroidSpeech();
          if (stopped) {
            settle({ error: 'cancelled', transcript: '', audioUrl: '' });
            return;
          }
        } else if (!window.isSecureContext) {
          settle({
            error: 'insecure',
            transcript: '',
            audioUrl: '',
            message: '請用 localhost 或 HTTPS 開啟頁面，瀏覽器才允許麥克風。'
          });
          return;
        }
        if (!preferNativeSpeech && !canRecord) {
          settle({
            error: 'unsupported',
            transcript: '',
            audioUrl: '',
            message: '這個瀏覽器不支援麥克風錄音，請改用 Chrome 或 Edge。'
          });
          return;
        }

        if (canRecord && !preferNativeSpeech) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: { echoCancellation: true, noiseSuppression: true }
            });
          } catch (err) {
            mediaError = mediaFailure(err, false);
            stream = null;
          }
          if (stopped) {
            releaseStream();
            settle({ error: 'cancelled', transcript: '', audioUrl: '' });
            return;
          }
          if (stream) {
            try {
              const preferred = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
              const mimeType = preferred.find((type) => {
                try { return MediaRecorder.isTypeSupported(type); } catch (e) { return false; }
              }) || '';
              recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
              recorder.ondataavailable = (event) => {
                if (event.data && event.data.size) chunks.push(event.data);
              };
              recorder.start(200);
              started = true;
            } catch (err) {
              mediaError = mediaFailure(err, true);
              if (stream) {
                stream.getTracks().forEach((track) => { try { track.stop(); } catch (e) {} });
                stream = null;
              }
              recorder = null;
            }
          }
        }

        if (stopped) {
          closeRecorder();
          return;
        }

        if (preferNativeSpeech) {
          const speechOk = speechPlugin ? await beginAndroidSpeechRecognition(speechPlugin) : false;
          if (stopped) {
            closeRecorder();
            return;
          }
          if (!speechOk && !recorder) {
            settle(nativeSpeechError || mediaError || {
              error: 'unsupported',
              transcript: '',
              audioUrl: '',
              message: '這台平板無法錄音，也無法使用語音辨識。'
            });
            return;
          }
        } else if (!recorder) {
          settle(mediaError || {
            error: 'unsupported',
            transcript: '',
            audioUrl: '',
            message: '這個瀏覽器不支援麥克風錄音，請改用 Chrome 或 Edge。'
          });
          return;
        } else {
          const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (Rec) {
            recognitionSupported = true;
            try {
              recognition = new Rec();
              recognition.lang = 'en-US';
              recognition.continuous = true;
              recognition.interimResults = true;
              recognition.onresult = (event) => {
                let finals = '';
                let interim = '';
                for (let i = 0; i < event.results.length; i++) {
                  const piece = event.results[i][0] ? event.results[i][0].transcript : '';
                  if (event.results[i].isFinal) finals += piece + ' ';
                  else interim += piece;
                }
                finalText = finals.trim();
                interimText = interim.trim();
                onUpdate({ transcript: transcriptNow(), remaining });
              };
              recognition.onerror = () => {};
              recognition.onend = () => {
                if (stopped || !recognition) return;
                try { recognition.start(); } catch (e) {}
              };
              recognition.start();
            } catch (e) {
              recognition = null;
            }
          }
        }

        onStart();
        onUpdate({ transcript: transcriptNow(), remaining });
        timer = setInterval(() => {
          remaining -= 1;
          onUpdate({ transcript: transcriptNow(), remaining: Math.max(0, remaining) });
          if (remaining <= 0) finish();
        }, 1000);
      })();

      return session;
    }

    function releasePracticeMicForRerender() {
      if (activeMicCapture && activeMicCapture.owner === 'practice' && !activeMicCapture.stopping) {
        activeMicCapture.stop();
      }
    }

    function releaseExamMicForRerender() {
      if (activeMicCapture && activeMicCapture.owner === 'exam' && !activeMicCapture.stopping) {
        activeMicCapture.stop();
      }
    }

    function getListeningSvg(svgType, sizeClass) {
      const cls = sizeClass || 'w-28 h-24';
      const frame = (bg, border, inner) => `<svg class="${cls} rounded-lg ${bg} border ${border} p-1 shrink-0" viewBox="0 0 120 90" fill="none">${inner}</svg>`;
      const scenes = {
        coffee: frame('bg-amber-50', 'border-amber-200', '<rect x="20" y="68" width="80" height="8" rx="3" fill="#78350F"/><path d="M42 28 H78 L68 52 H52 Z" fill="#D97706" stroke="#78350F" stroke-width="2"/><rect x="46" y="52" width="28" height="16" rx="3" fill="#FEF3C7" stroke="#78350F" stroke-width="2"/><path d="M35 14 Q60 10 60 26" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="22" r="2.5" fill="#0284C7"/>'),
        runner: frame('bg-emerald-50', 'border-emerald-200', '<path d="M10 72 Q60 62 110 72" stroke="#059669" stroke-width="4"/><circle cx="62" cy="24" r="7" fill="#0F172A"/><path d="M58 32 L52 50 L38 58 M58 32 L72 44 L84 38 M52 50 L68 58 L74 70" stroke="#4F46E5" stroke-width="4" stroke-linecap="round"/>'),
        schedule: frame('bg-indigo-50', 'border-indigo-200', '<rect x="16" y="16" width="88" height="58" rx="6" fill="#fff" stroke="#4F46E5" stroke-width="2"/><rect x="28" y="46" width="14" height="20" fill="#94A3B8"/><rect x="52" y="28" width="14" height="38" fill="#4F46E5"/><rect x="76" y="38" width="14" height="28" fill="#60A5FA"/>'),
        morning: frame('bg-sky-50', 'border-sky-200', '<circle cx="22" cy="22" r="8" fill="#F59E0B"/><path d="M8 68 Q40 58 78 68" stroke="#059669" stroke-width="4"/><circle cx="58" cy="28" r="6" fill="#0F172A"/><path d="M54 36 L48 50 L36 56 M54 36 L68 46" stroke="#4F46E5" stroke-width="3" stroke-linecap="round"/><rect x="86" y="40" width="18" height="14" rx="2" fill="#FEF3C7" stroke="#92400E"/>'),
        balance: frame('bg-violet-50', 'border-violet-200', '<rect x="10" y="22" width="28" height="48" rx="4" fill="#fff" stroke="#4F46E5"/><rect x="46" y="22" width="28" height="48" rx="4" fill="#fff" stroke="#059669"/><rect x="82" y="22" width="28" height="48" rx="4" fill="#fff" stroke="#D97706"/><text x="24" y="50" text-anchor="middle" font-size="11" fill="#4F46E5">Work</text><text x="60" y="50" text-anchor="middle" font-size="11" fill="#059669">Run</text><text x="96" y="50" text-anchor="middle" font-size="11" fill="#D97706">Home</text>'),
        desk: frame('bg-slate-50', 'border-slate-300', '<rect x="18" y="28" width="84" height="36" rx="4" fill="#fff" stroke="#334155" stroke-width="2"/><rect x="48" y="64" width="24" height="10" fill="#94A3B8"/><text x="60" y="50" text-anchor="middle" font-size="12" fill="#0F172A">Front desk</text>'),
        t610: frame('bg-amber-50', 'border-amber-300', '<circle cx="60" cy="42" r="24" stroke="#92400E" stroke-width="3"/><path d="M60 42 L60 26 M60 42 L72 48" stroke="#92400E" stroke-width="3" stroke-linecap="round"/><text x="60" y="80" text-anchor="middle" font-size="12" fill="#92400E">6:10</text>'),
        t730: frame('bg-orange-50', 'border-orange-300', '<circle cx="60" cy="42" r="24" stroke="#C2410C" stroke-width="3"/><path d="M60 42 L72 30 M60 42 L60 58" stroke="#C2410C" stroke-width="3" stroke-linecap="round"/><text x="60" y="80" text-anchor="middle" font-size="12" fill="#C2410C">7:30</text>'),
        noon: frame('bg-yellow-50', 'border-yellow-300', '<circle cx="60" cy="40" r="16" fill="#FACC15"/><text x="60" y="78" text-anchor="middle" font-size="12" fill="#A16207">12:00</text>'),
        month: frame('bg-slate-50', 'border-slate-300', '<rect x="24" y="18" width="72" height="56" rx="4" fill="#fff" stroke="#334155"/><text x="60" y="50" text-anchor="middle" font-size="13" fill="#0F172A">Next month</text>'),
        computer: frame('bg-sky-50', 'border-sky-300', '<rect x="28" y="20" width="64" height="40" rx="3" fill="#fff" stroke="#0369A1" stroke-width="2"/><rect x="50" y="62" width="20" height="6" fill="#0369A1"/><text x="60" y="44" text-anchor="middle" font-size="11" fill="#0369A1">Computer</text>'),
        closed: frame('bg-rose-50', 'border-rose-300', '<rect x="22" y="24" width="76" height="40" rx="4" fill="#fff" stroke="#BE123C" stroke-width="2"/><text x="60" y="48" text-anchor="middle" font-size="14" fill="#BE123C">CLOSED</text>'),
        bread: frame('bg-amber-50', 'border-amber-300', '<ellipse cx="42" cy="48" rx="18" ry="12" fill="#FBBF24" stroke="#92400E"/><ellipse cx="74" cy="48" rx="18" ry="12" fill="#F59E0B" stroke="#92400E"/><text x="60" y="78" text-anchor="middle" font-size="11" fill="#92400E">2 loaves</text>'),
        cake: frame('bg-pink-50', 'border-pink-300', '<path d="M36 58 L44 32 H76 L84 58 Z" fill="#FB7185" stroke="#9F1239"/><text x="60" y="78" text-anchor="middle" font-size="11" fill="#9F1239">Cake</text>'),
        card: frame('bg-indigo-50', 'border-indigo-300', '<rect x="28" y="26" width="64" height="40" rx="4" fill="#fff" stroke="#4338CA" stroke-width="2"/><text x="60" y="50" text-anchor="middle" font-size="12" fill="#4338CA">Student card</text>'),
        friends: frame('bg-emerald-50', 'border-emerald-300', '<circle cx="42" cy="34" r="8" fill="#0F172A"/><circle cx="78" cy="34" r="8" fill="#0F172A"/><text x="60" y="74" text-anchor="middle" font-size="11" fill="#065F46">3 friends</text>'),
        cash: frame('bg-green-50', 'border-green-300', '<rect x="30" y="28" width="60" height="34" rx="4" fill="#fff" stroke="#15803D" stroke-width="2"/><text x="60" y="50" text-anchor="middle" font-size="16" fill="#15803D">$</text>'),
        monday: frame('bg-slate-50', 'border-slate-300', '<rect x="24" y="20" width="72" height="52" rx="4" fill="#fff" stroke="#334155"/><text x="60" y="50" text-anchor="middle" font-size="13" fill="#0F172A">Monday</text>'),
        saturday: frame('bg-violet-50', 'border-violet-300', '<rect x="24" y="20" width="72" height="52" rx="4" fill="#fff" stroke="#6D28D9"/><text x="60" y="50" text-anchor="middle" font-size="12" fill="#6D28D9">Saturday</text>'),
        everyday: frame('bg-sky-50', 'border-sky-300', '<text x="60" y="50" text-anchor="middle" font-size="13" fill="#0369A1">Every day</text>'),
        night: frame('bg-slate-900', 'border-slate-700', '<circle cx="78" cy="28" r="10" fill="#F8FAFC"/><text x="60" y="68" text-anchor="middle" font-size="12" fill="#E2E8F0">Night</text>'),
        home: frame('bg-orange-50', 'border-orange-300', '<path d="M20 48 L60 22 L100 48 V74 H20 Z" fill="#FFF7ED" stroke="#C2410C" stroke-width="2"/><text x="60" y="66" text-anchor="middle" font-size="12" fill="#C2410C">Home</text>')
      };
      return scenes[svgType] || scenes.schedule;
    }

    function listeningFace(part) {
      const name = part || '';
      if (name.indexOf('看圖辨義') >= 0) return 'picture-stem';
      if (name.indexOf('短文聽解') >= 0) return 'picture-choices';
      return 'printed-choices';
    }

    function optionLetter(index) {
      return ['A', 'B', 'C', 'D'][index] || String(index + 1);
    }

    function listeningInstruction(q) {
      const face = listeningFace(q.part);
      if (face === 'picture-stem') return '請看圖。描述只從語音播出，試卷只標示 A、B、C、D。每題只播一次。';
      if (face === 'picture-choices') return '請聽短文與問題，選出最符合的圖片。題目不印在試卷上。每題只播一次。';
      if ((q.part || '').indexOf('問答') >= 0) return '請聽英語句子，從印出的回答中選一項。問句不印在試卷上。每題只播一次。';
      if (q.chartHtml) return '請看圖表，並聽對話或談話與問題。題幹不印出。每題只播一次。';
      return '請聽語音與問題，從印出的選項作答。題幹不印在試卷上。每題只播一次。';
    }

    function listeningStemHtml(q) {
      const face = listeningFace(q.part);
      if (face === 'picture-stem' && q.svgType) {
        return `<div class="mb-2">${getListeningSvg(q.svgType, 'w-40 h-32')}</div>`;
      }
      if (q.chartHtml) {
        return `<div class="mb-2 p-3 rounded-lg bg-white border border-slate-200 inline-block">${q.chartHtml}</div>`;
      }
      return '';
    }

    function listeningChoiceInner(q, opt, oIdx, revealText) {
      const face = listeningFace(q.part);
      if (face === 'picture-choices' && q.optionSvgs && q.optionSvgs[oIdx]) {
        const caption = revealText ? `<span class="block text-[11px] text-slate-600 mt-1 max-w-[9rem]">${opt}</span>` : '';
        return `<span class="font-bold mr-2">${optionLetter(oIdx)}.</span>${getListeningSvg(q.optionSvgs[oIdx], 'w-24 h-20')}${caption}`;
      }
      if (face === 'picture-stem' && !revealText) {
        return `<span class="font-bold text-base px-2">${optionLetter(oIdx)}</span>`;
      }
      return `<span>${opt}</span>`;
    }

    function paperTable(caption, rows) {
      const body = rows.map(row => `<tr><td class="border border-slate-300 px-2 py-1">${row[0]}</td><td class="border border-slate-300 px-2 py-1 font-semibold">${row[1]}</td></tr>`).join('');
      return `<div class="text-[11px] font-bold text-slate-800 mb-1">${caption}</div><table class="text-[11px] text-slate-700 border-collapse bg-white"><tbody>${body}</tbody></table>`;
    }

    // =========================================================================
    // 6. RENDER EXAM SECTIONS (LISTENING, READING, STAGE 2 SPEAKING, WRITING)
    // =========================================================================
    function renderListeningSection() {
      const container = document.getElementById('listening-questions-container');
      if (!container) return;
      container.innerHTML = '';
      const bank = bankForExam(state.exam.level).listening;

      if (!state.exam.listeningPlayed) state.exam.listeningPlayed = {};
      bank.forEach((q, idx) => {
        const selected = state.exam.listeningAnswers[q.id];
        const played = !!state.exam.listeningPlayed[q.id];
        const card = document.createElement('div');
        card.className = 'p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3';

        let optionsHtml = '';
        q.options.forEach((opt, oIdx) => {
          const isChecked = selected === oIdx;
          optionsHtml += `
            <label class="flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors text-xs sm:text-sm ${isChecked ? 'bg-indigo-50 border-indigo-500 font-semibold text-indigo-950' : 'bg-white border-slate-200 hover:border-slate-300'}">
              <input type="radio" name="listen_${q.id}" value="${oIdx}" ${isChecked ? 'checked' : ''} data-qid="${q.id}" data-qnum="${idx + 1}" class="listen-radio text-indigo-600 focus:ring-indigo-500">
              ${listeningChoiceInner(q, opt, oIdx, false)}
            </label>
          `;
        });

        const playButton = played
          ? `<button type="button" disabled class="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-500 text-xs font-semibold">本題已播出（正試只播一次）</button>`
          : `<button type="button" data-qid="${q.id}" data-qnum="${idx + 1}" class="btn-play-listening px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"><span>播放聽力（只播一次）</span></button>`;

        card.innerHTML = `
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <span class="text-[11px] font-bold text-indigo-600 uppercase">${q.part}</span>
              <h4 class="text-sm font-bold text-slate-900 mt-0.5">第 ${idx + 1} 題</h4>
              <p class="text-xs text-slate-600 mt-0.5">${listeningInstruction(q)}</p>
            </div>
            ${playButton}
          </div>
          ${listeningStemHtml(q)}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${optionsHtml}
          </div>
        `;
        container.appendChild(card);
      });

      container.querySelectorAll('.btn-play-listening').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-qid');
          const qnum = btn.getAttribute('data-qnum');
          const q = bank.find(item => item.id === qid);
          if (!q || state.exam.listeningPlayed[qid]) return;
          state.exam.listeningPlayed[qid] = true;
          state.exam.lastCheckpoint = `第一階段-聽力第${qnum}題`;
          btn.innerHTML = '<span>語音播放中（只播一次）</span>';
          btn.disabled = true;
          speakEnglishOnce(q.audioText, state.exam.level === '初級' ? 0.92 : 1.0, () => {
            renderListeningSection();
            updateLiveScoreStrip();
          });
        });
      });

      container.querySelectorAll('.listen-radio').forEach(radio => {
        radio.addEventListener('change', () => {
          const qid = radio.getAttribute('data-qid');
          const qnum = radio.getAttribute('data-qnum');
          state.exam.listeningAnswers[qid] = Number(radio.value);
          state.exam.lastCheckpoint = `第一階段-聽力第${qnum}題`;
          renderListeningSection();
          updateLiveScoreStrip();
          syncCurrentExamToSheet('進行中');
        });
      });
    }

    function renderReadingSection() {
      const container = document.getElementById('reading-questions-container');
      if (!container) return;
      container.innerHTML = '';
      const bank = bankForExam(state.exam.level).reading;

      bank.forEach((q, idx) => {
        const selected = state.exam.readingAnswers[q.id];
        const card = document.createElement('div');
        card.className = 'p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3';

        const passageHtml = q.passage
          ? `<div class="p-3.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">${q.passage}</div>`
          : '';

        let optionsHtml = '';
        q.options.forEach((opt, oIdx) => {
          const isChecked = selected === oIdx;
          optionsHtml += `
            <label class="flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors text-xs sm:text-sm ${isChecked ? 'bg-indigo-50 border-indigo-500 font-semibold text-indigo-950' : 'bg-white border-slate-200 hover:border-slate-300'}">
              <input type="radio" name="read_${q.id}" value="${oIdx}" ${isChecked ? 'checked' : ''} data-qid="${q.id}" data-qnum="${idx + 1}" class="read-radio text-indigo-600 focus:ring-indigo-500">
              <span>${opt}</span>
            </label>
          `;
        });

        card.innerHTML = `
          <div>
            <span class="text-[11px] font-bold text-indigo-600 uppercase">${q.part}</span>
            ${passageHtml ? `<div class="mt-2">${passageHtml}</div>` : ''}
            <h4 class="text-sm font-bold text-slate-900 mt-2">${q.prompt}</h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${optionsHtml}
          </div>
        `;
        container.appendChild(card);
      });

      container.querySelectorAll('.read-radio').forEach(radio => {
        radio.addEventListener('change', () => {
          const qid = radio.getAttribute('data-qid');
          const qnum = radio.getAttribute('data-qnum');
          state.exam.readingAnswers[qid] = Number(radio.value);
          state.exam.lastCheckpoint = `第一階段-閱讀第${qnum}題`;
          renderReadingSection();
          updateLiveScoreStrip();
          syncCurrentExamToSheet('進行中');
        });
      });
    }

    function renderSpeakingSection() {
      releaseExamMicForRerender();
      const container = document.getElementById('speaking-questions-container');
      if (!container) return;
      container.innerHTML = '';
      const bank = bankForExam(state.exam.level).speaking;

      bank.forEach((q, idx) => {
        if (!state.exam.speakingScores[q.id]) {
          state.exam.speakingScores[q.id] = {
            statusText: '尚未播音',
            recorded: false,
            transcript: '',
            fluencyBand: 0,
            grammarBand: 0,
            score100: 0,
            playedTwice: false
          };
        }
        const sc = state.exam.speakingScores[q.id];
        const card = document.createElement('div');
        card.className = 'p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3';

        const isPictureTalk = (q.part || '').indexOf('看圖') >= 0;
        let promptDisplay = '';
        if (isPictureTalk) {
          const questions = (q.printedQuestions || ['請描述圖中的情景，並說出你的看法。'])
            .map(text => `<li>${text}</li>`).join('');
          promptDisplay = `<div class="flex flex-col sm:flex-row gap-3 items-start p-3 rounded-lg bg-white border border-indigo-200">
            ${getListeningSvg(q.svgType || 'balance', 'w-40 h-32')}
            <div>
              <div class="text-[11px] font-bold text-indigo-700 mb-1">試卷印有圖片與問題，請直接回答</div>
              <ol class="list-decimal pl-4 text-xs sm:text-sm text-slate-800 space-y-1">${questions}</ol>
            </div>
          </div>`;
        } else if (!q.audioOnly) {
          promptDisplay = `<div class="p-3 rounded-lg bg-white border border-indigo-200 text-xs sm:text-sm text-slate-800 font-medium">${q.audioText}</div>`;
        } else {
          promptDisplay = `<div class="p-3 rounded-lg bg-slate-900 text-slate-300 text-xs">純音聽：題目由耳機連續播出 2 次，試卷不印題目，作答中不能打開原文。</div>`;
        }

        card.innerHTML = `
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <span class="text-[11px] font-bold text-indigo-600 uppercase">${q.part}</span>
              <h4 class="text-sm font-bold text-slate-900 mt-0.5">第 ${idx + 1} 題（作答時限 ${q.timeLimitSec} 秒）</h4>
              <p class="text-xs text-slate-600 mt-0.5">${q.instruction}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold ${sc.score100 >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}">
                本題得分：${sc.score100} / 100
              </span>
            </div>
          </div>

          ${promptDisplay}

          <div class="flex flex-wrap items-center gap-2.5 pt-1">
            ${q.audioOnly ? `<button type="button" data-qid="${q.id}" data-qnum="${idx + 1}" ${sc.playedTwice ? 'disabled' : ''}
              class="btn-stage2-play-twice px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm ${sc.playedTwice ? 'opacity-60' : ''}">
              <span>${sc.playedTwice ? '已連播 2 次' : '1. 耳機播放題目（連播 2 次）'}</span>
            </button>` : ''}

            <button type="button" data-qid="${q.id}" data-qnum="${idx + 1}"
              class="btn-stage2-record px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm">
              <span>🎙️ 2. 開始麥克風錄音作答 (${q.timeLimitSec}秒)</span>
            </button>

            <span id="speak-status-${q.id}" class="text-xs font-medium text-slate-600">${sc.statusText}</span>
          </div>

          <!-- Spoken Response / Transcript Input & Band Evaluation -->
          <div class="bg-white rounded-xl p-3 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-semibold text-slate-700">🗣️ 語音辨識轉譯文本 / 口說作答內容（可於錄音後檢視或微調）：</span>
              <span class="text-slate-500">發音流利度：<strong>${sc.fluencyBand}</strong>/5 級分 ｜ 文法字彙：<strong>${sc.grammarBand}</strong>/5 級分</span>
            </div>
            <div class="flex flex-col sm:flex-row gap-2">
              <input type="text" data-qid="${q.id}" value="${sc.transcript.replace(/"/g, '&quot;')}"
                placeholder="點擊「開始麥克風錄音作答」自動填入語音辨識結果，或直接輸入您的口說回答..."
                class="input-speak-transcript flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <button type="button" data-qid="${q.id}" class="btn-eval-speaking px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0">
                重新評定級分
              </button>
            </div>
            ${sc.audioUrl ? `<audio controls preload="none" src="${sc.audioUrl}" class="w-full"></audio>` : ''}
          </div>
        `;
        container.appendChild(card);
      });

      // Play Twice Audio-Listening Handler
      container.querySelectorAll('.btn-stage2-play-twice').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-qid');
          const qnum = btn.getAttribute('data-qnum');
          const q = bank.find(item => item.id === qid);
          const sc = state.exam.speakingScores[qid];
          const statusEl = document.getElementById(`speak-status-${qid}`);

          if (sc.playedTwice) return;
          state.exam.lastCheckpoint = `第二階段-音聽口說第${qnum}題`;
          btn.disabled = true;
          if (statusEl) statusEl.innerHTML = '<span class="text-indigo-600 font-bold">🔊 第 1 次播音中...</span>';

          speakEnglishOnce(q.audioText, state.exam.level === '初級' ? 0.92 : 1.0, () => {
            if (statusEl) statusEl.innerHTML = '<span class="text-amber-600 font-bold">⏳ 間隔停頓 1.5 秒...</span>';
            setTimeout(() => {
              if (statusEl) statusEl.innerHTML = '<span class="text-indigo-600 font-bold">🔊 第 2 次播音中...</span>';
              speakEnglishOnce(q.audioText, state.exam.level === '初級' ? 0.92 : 1.0, () => {
                playBeepTone(1046, 250);
                sc.playedTwice = true;
                sc.statusText = '✓ 已完成 2 次耳機播音，請錄音作答';
                if (statusEl) statusEl.innerHTML = '<span class="text-emerald-700 font-bold">🔔 播音完畢 (Beep)！請立即錄音作答</span>';
                btn.innerHTML = '<span>已連播 2 次</span>';
              });
            }, 1500);
          });
        });
      });

      // Record & Evaluate Handler
      container.querySelectorAll('.btn-stage2-record').forEach(btn => {
        btn.addEventListener('click', async () => {
          const qid = btn.getAttribute('data-qid');
          const qnum = btn.getAttribute('data-qnum');
          const q = bank.find(item => item.id === qid);
          const sc = state.exam.speakingScores[qid];
          const statusEl = document.getElementById(`speak-status-${qid}`);
          const label = btn.querySelector('span');
          const inputEl = container.querySelector(`.input-speak-transcript[data-qid="${qid}"]`);

          if (activeMicCapture && activeMicCapture.stopping) return;
          if (activeMicCapture && activeMicCapture.qid === qid) {
            activeMicCapture.stop();
            return;
          }
          if (activeMicCapture) activeMicCapture.stop();
          stopEnglishSpeech();

          state.exam.lastCheckpoint = `第二階段-音聽口說第${qnum}題`;
          if (label) label.textContent = '⏳ 正在開啟麥克風...';
          if (statusEl) statusEl.textContent = '請允許麥克風，接著用英語作答。';

          const session = startEnglishMicCapture({
            seconds: q.timeLimitSec || 15,
            owner: 'exam',
            qid,
            onStart() { playBeepTone(880, 160); },
            onUpdate({ transcript, remaining }) {
              if (label) label.textContent = `⏹️ 停止錄音（剩 ${remaining} 秒）`;
              if (statusEl) {
                statusEl.textContent = transcript
                  ? `錄音中，剩餘 ${remaining} 秒｜${transcript}`
                  : `錄音中，剩餘 ${remaining} 秒。請說英語。`;
              }
              if (transcript && inputEl) {
                inputEl.value = transcript;
                sc.transcript = transcript;
              }
            }
          });
          activeMicCapture = session;
          const result = await session.done;
          const stillCurrent = activeMicCapture === session;
          if (stillCurrent) activeMicCapture = null;
          if (!result.error) {
            if (result.audioUrl) {
              if (sc.audioUrl) URL.revokeObjectURL(sc.audioUrl);
              sc.audioUrl = result.audioUrl;
            }
            if (result.transcript) sc.transcript = result.transcript;
            sc.recorded = Boolean(sc.audioUrl || (sc.transcript && sc.transcript.trim()));
          }
          if (!stillCurrent) return;
          if (result.error === 'cancelled') return;
          if (result.error) {
            sc.statusText = result.message;
            if (statusEl) statusEl.textContent = result.message;
            if (label) label.textContent = `🎙️ 2. 開始麥克風錄音作答 (${q.timeLimitSec}秒)`;
            showToast('錄音無法使用', result.message, 'amber');
            return;
          }
          playBeepTone(523, 180);
          if (sc.transcript && sc.transcript.trim()) {
            gradeSingleSpeakingItem(q, sc);
            sc.statusText = `✓ 錄音完成並已轉譯評分 (${sc.score100}分)`;
            showToast(`口說第 ${qnum} 題錄音評分完成`, `發音語調流利度 ${sc.fluencyBand} 級分、文法字彙 ${sc.grammarBand} 級分 → 換算 ${sc.score100} 分`, 'emerald');
          } else if (sc.audioUrl) {
            sc.statusText = '已錄音，但沒有辨識到英語。可播放回聽，或在下方輸入後按重新評定級分。';
            showToast('已存下錄音', '這次沒有辨識到英語。可以播放回聽，或手動輸入句子後重新評分。', 'amber');
          } else {
            sc.statusText = '錄音沒有成功，請再試一次。';
            showToast('錄音沒有成功', '請再按一次錄音，並確認麥克風有收到聲音。', 'amber');
          }
          renderSpeakingSection();
          updateLiveScoreStrip();
          syncCurrentExamToSheet('進行中');
        });
      });

      container.querySelectorAll('.input-speak-transcript').forEach(inp => {
        inp.addEventListener('input', () => {
          const qid = inp.getAttribute('data-qid');
          state.exam.speakingScores[qid].transcript = inp.value;
        });
      });

      container.querySelectorAll('.btn-eval-speaking').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-qid');
          const q = bank.find(item => item.id === qid);
          const sc = state.exam.speakingScores[qid];
          gradeSingleSpeakingItem(q, sc);
          renderSpeakingSection();
          updateLiveScoreStrip();
          syncCurrentExamToSheet('進行中');
        });
      });
    }

    function gradeSingleSpeakingItem(q, sc) {
      const text = (sc.transcript || '').toLowerCase().trim();
      if (!text) {
        sc.fluencyBand = 0;
        sc.grammarBand = 0;
        sc.score100 = 0;
        return;
      }
      let matched = 0;
      q.expectedKeywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) matched++;
      });
      const ratio = matched / Math.max(1, q.expectedKeywords.length);
      const wordCount = text.split(/\s+/).length;

      sc.fluencyBand = wordCount >= 7 ? 4.5 : wordCount >= 4 ? 4.0 : 3.0;
      sc.grammarBand = ratio >= 0.45 ? 4.5 : ratio >= 0.25 ? 4.0 : 3.5;
      sc.score100 = Math.round((sc.fluencyBand + sc.grammarBand) * 10);
    }

    function renderWritingSection() {
      const container = document.getElementById('writing-questions-container');
      const subtitle = document.getElementById('writing-subtitle-desc');
      if (!container) return;
      container.innerHTML = '';

      const level = state.exam.level;
      const bankW = bankForExam(level).writing;
      const w = state.exam.writingAnswers;

      if (level === '初級') {
        if (subtitle) subtitle.textContent = '初級：第一部分單句寫作 3 題 (佔 50%) ＋ 第二部分看圖段落寫作 1 篇約 50 字 (佔 50%)，通過標準 70 分。';
        const sValues = [w.s1 || '', w.s2 || '', w.s3 || ''];
        let sentencesHtml = '';
        bankW.sentences.forEach((sq, idx) => {
          sentencesHtml += `
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div>
                <span class="text-xs font-bold text-indigo-700">${sq.prompt.replace(/\n/g, '<br>')}</span>
              </div>
              <input type="text" data-sidx="${idx}" value="${sValues[idx].replace(/"/g, '&quot;')}"
                placeholder="請輸入完整英文句子（注意大小寫與標點符號）..."
                class="input-writing-sent w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
          `;
        });

        const wordCount = (w.essay || '').trim() ? (w.essay || '').trim().split(/\s+/).length : 0;
        container.innerHTML = `
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-slate-900">第一部分：單句寫作（共 3 題，每題 0~2 級分，佔 50%）</h4>
            ${sentencesHtml}
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-sm font-bold text-slate-900">${bankW.essay.title}</h4>
              <div class="flex items-center gap-3 text-xs">
                <span class="text-slate-600">目前字數：<strong id="essay-word-count" class="text-indigo-700">${wordCount}</strong> 字 (建議約 50 字)</span>
              </div>
            </div>
            ${bankW.essay.svgType ? `<div class="flex items-center gap-3">${getListeningSvg(bankW.essay.svgType, 'w-36 h-28')}<p class="text-[11px] text-slate-500">看圖寫作：請描述圖中的情景。</p></div>` : ''}
            <p class="text-xs text-slate-600 leading-relaxed">${bankW.essay.prompt}</p>
            <textarea id="textarea-writing-essay" rows="4" placeholder="請在此撰寫約 50 字的英文段落..."
              class="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">${w.essay || ''}</textarea>
          </div>
          ${w.feedback ? `<div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">🤖 AI 評分回饋：${w.feedback}</div>` : ''}
        `;

        container.querySelectorAll('.input-writing-sent').forEach(inp => {
          inp.addEventListener('input', () => {
            const idx = Number(inp.getAttribute('data-sidx'));
            if (idx === 0) w.s1 = inp.value;
            if (idx === 1) w.s2 = inp.value;
            if (idx === 2) w.s3 = inp.value;
            state.exam.lastCheckpoint = `第二階段-寫作單句第${idx + 1}題`;
            evaluateWritingScore(false);
            updateLiveScoreStrip();
          });
        });

      } else {
        // 中級
        if (subtitle) subtitle.textContent = '中級：第一部分中譯英 1 題 (佔 40%) ＋ 第二部分英文作文 1 篇約 80~120 字 (佔 60%)，通過標準 80 分。';
        const wordCount = (w.essay || '').trim() ? (w.essay || '').trim().split(/\s+/).length : 0;
        container.innerHTML = `
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h4 class="text-sm font-bold text-slate-900">${bankW.translation.title}</h4>
            <p class="text-xs text-slate-700 whitespace-pre-line leading-relaxed">${bankW.translation.prompt}</p>
            <textarea id="textarea-writing-trans" rows="3" placeholder="請輸入英文翻譯..."
              class="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">${w.trans || ''}</textarea>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-sm font-bold text-slate-900">${bankW.essay.title}</h4>
              <div class="flex items-center gap-3 text-xs">
                <span class="text-slate-600">目前字數：<strong id="essay-word-count" class="text-indigo-700">${wordCount}</strong> 字 (建議 80~120 字)</span>
              </div>
            </div>
            <p class="text-xs text-slate-600 whitespace-pre-line leading-relaxed">${bankW.essay.prompt}</p>
            <textarea id="textarea-writing-essay" rows="5" placeholder="請在此撰寫約 80~120 字的英文作文..."
              class="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">${w.essay || ''}</textarea>
          </div>
          ${w.feedback ? `<div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">🤖 AI 評分回饋：${w.feedback}</div>` : ''}
        `;

        const transArea = document.getElementById('textarea-writing-trans');
        if (transArea) {
          transArea.addEventListener('input', () => {
            w.trans = transArea.value;
            state.exam.lastCheckpoint = '第二階段-寫作中譯英';
            evaluateWritingScore(false);
            updateLiveScoreStrip();
          });
        }
      }

      const essayArea = document.getElementById('textarea-writing-essay');
      if (essayArea) {
        essayArea.addEventListener('input', () => {
          w.essay = essayArea.value;
          state.exam.lastCheckpoint = '第二階段-寫作段落作文';
          const wc = w.essay.trim() ? w.essay.trim().split(/\s+/).length : 0;
          const wcEl = document.getElementById('essay-word-count');
          if (wcEl) wcEl.textContent = String(wc);
          evaluateWritingScore(false);
          updateLiveScoreStrip();
        });
      }

    }

    // =========================================================================
    // 7. EXAM LIFECYCLE CONTROL (START, TIMER,STAGE SWITCH, CLOSE, SUBMIT)
    // =========================================================================
    function stopExamTimer() {
      if (state.exam.timerInterval) {
        clearInterval(state.exam.timerInterval);
        state.exam.timerInterval = null;
      }
    }

    let examStartPending = false;

    async function startNewExam(level, options) {
      if (examStartPending) return false;
      if (!state.user || !state.user.loggedIn) {
        updateActiveView();
        return false;
      }
      if (state.exam.active && !(options && options.confirmedRestart)) {
        showExamLeaveGuard({
          title: '誤觸／離開目前程序',
          body: '偵測到可能誤觸而另開一場測驗。確認後會離開目前程序並產生新的測驗序號；先前那一筆不會改成已交卷。',
          leaveLabel: '確認離開並重考',
          onLeave: () => startNewExam(level, Object.assign({}, options || {}, { confirmedRestart: true }))
        });
        return false;
      }

      examStartPending = true;
      const waitTip = setTimeout(() => {
        showToast('正在準備試卷', '計時還沒開始，請稍候。', 'amber');
      }, 600);
      try {
        const remote = await fetchGeminiPaper(level, 'exam');
        const applied = !!(remote && applyGeminiPayload(level, remote, 'exam'));
        const sameAsPractice = applied && paperSignature(state.examPaper.set) === paperSignature(QUESTION_BANK[level]);
        if (!applied || sameAsPractice) prepareFreshExamPaper(level);
      } catch (err) {
        prepareFreshExamPaper(level);
      } finally {
        clearTimeout(waitTip);
        examStartPending = false;
      }

      stopExamTimer();
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const sid = `GEPT-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

      state.exam = {
        active: true,
        sessionId: sid,
        level: level,
        startTimeMs: Date.now(),
        startTimeStr: formatNow(now),
        remainingSeconds: 1800, // 30 minutes
        timerInterval: null,
        lastCheckpoint: '第一階段-聽力第1題',
        listeningAnswers: {},
        listeningPlayed: {},
        readingAnswers: {},
        speakingScores: {},
        writingAnswers: { s1: '', s2: '', s3: '', trans: '', essay: '', gradedScore: 0, feedback: '' }
      };

      document.getElementById('exam-level-badge').textContent = `${level} 正式試卷第 ${state.examPaper.round} 回`;
      document.getElementById('exam-session-id').textContent = sid;
      document.getElementById('global-timer-bar').classList.remove('hidden');
      document.getElementById('global-timer-bar').classList.add('flex');
      document.getElementById('global-session-label').textContent = `${level}測驗進行中`;

      renderListeningSection();
      renderReadingSection();
      renderSpeakingSection();
      renderWritingSection();
      switchExamStage('listening');
      updateLiveScoreStrip();

      syncCurrentExamToSheet('進行中', `考生 ${state.user.chineseName} 開始 ${level} 30分鐘測驗（自動建檔）`, false)
        .then((ok) => {
          toastSheetResult(
            ok,
            '已開始測驗，並換成新題',
            `測驗序號 ${sid} 已寫入「全民英檢成績」。正式試卷第 ${state.examPaper.round} 回，與練習卷第 ${state.practiceRound[level] || 1} 回不是同一份。`,
            'emerald',
            '測驗已開始，成績尚未寫入試算表'
          );
        });

      state.exam.timerInterval = setInterval(() => {
        if (!state.exam.active) return;
        state.exam.remainingSeconds--;
        const mins = String(Math.floor(state.exam.remainingSeconds / 60)).padStart(2, '0');
        const secs = String(state.exam.remainingSeconds % 60).padStart(2, '0');
        const cdEl = document.getElementById('global-countdown-text');
        if (cdEl) cdEl.textContent = `${mins}:${secs}`;

        if (state.exam.remainingSeconds <= 0) {
          stopExamTimer();
          state.exam.active = false;
          syncCurrentExamToSheet('時間到交卷', '30分鐘測驗時間結束，系統自動交卷寫入成績', false)
            .then((ok) => {
              toastSheetResult(
                ok,
                '⏰ 30 分鐘測驗時間到！',
                '系統已自動交卷並將成績寫入「全民英檢成績」。',
                'amber',
                '⏰ 時間到，但成績尚未寫入試算表'
              );
            });
          state.activeTab = 'records';
          updateActiveView();
        }
      }, 1000);

      state.activeTab = 'exam';
      updateActiveView();
      armExamBackGuard();
      return true;
    }

    function requestExamStage(stageName) {
      if (!state.exam.active || state.activeTab !== 'exam' || state.activeStage === stageName) {
        switchExamStage(stageName);
        return;
      }
      const fromLabel = examStageLabel(state.activeStage);
      const toLabel = examStageLabel(stageName);
      showExamLeaveGuard({
        title: '誤觸／離開目前程序',
        body: `偵測到可能誤觸，正要離開「${fromLabel}」，改到「${toLabel}」。若不是要換科，請留在目前程序。測驗仍在計時。`,
        leaveLabel: `確認前往${toLabel}`,
        onLeave: () => switchExamStage(stageName)
      });
    }

    function requestLeaveExamScreen(targetLabel, onLeave) {
      if (!state.exam.active || state.activeTab !== 'exam') {
        onLeave();
        return;
      }
      showExamLeaveGuard({
        title: '誤觸／離開目前程序',
        body: `偵測到可能誤觸，正要離開測驗畫面，前往「${targetLabel}」。測驗仍在計時。`,
        leaveLabel: '確認離開',
        onLeave: onLeave
      });
    }

    function switchExamStage(stageName) {
      state.activeStage = stageName;
      const panels = {
        listening: document.getElementById('panel-stage-listening'),
        reading: document.getElementById('panel-stage-reading'),
        speaking: document.getElementById('panel-stage-speaking'),
        writing: document.getElementById('panel-stage-writing')
      };
      const tabs = {
        listening: document.getElementById('stage-tab-listening'),
        reading: document.getElementById('stage-tab-reading'),
        speaking: document.getElementById('stage-tab-speaking'),
        writing: document.getElementById('stage-tab-writing')
      };

      Object.keys(panels).forEach(k => {
        if (k === stageName) {
          panels[k].classList.remove('hidden');
          tabs[k].className = 'p-3 rounded-xl border text-left transition-all bg-indigo-600 text-white border-indigo-600 shadow-sm';
        } else {
          panels[k].classList.add('hidden');
          tabs[k].className = 'p-3 rounded-xl border text-left transition-all bg-white text-slate-700 border-slate-200 hover:border-indigo-400';
        }
      });
    }

    // =========================================================================
    // 7.5 PRACTICE MODE & ENCOURAGING FEEDBACK ENGINE (自主練習與鼓勵回饋引擎)
    // =========================================================================
    function getQuestionMeta(qid, idx, isListening) {
      if (state.dynamicMetaMap && state.dynamicMetaMap[qid]) {
        return state.dynamicMetaMap[qid];
      }
      const peerRates = [86, 82, 79, 74, 88, 68, 84, 76, 63, 72];
      const peerRate = peerRates[idx % peerRates.length];
      const explanations = {
        EL1: '圖片中人物正在手沖咖啡（making pour-over coffee），掌握動詞片語即可輕鬆得分。',
        EL2: '圖中人們在公園跑道慢跑（running on a park track），注意場景關鍵字 park track。',
        EL3: 'How much 詢問票價金額，因此選 B（八百四十元）。A 為花費時間。',
        EL4: 'When 詢問會議開始時間，因此選 B（兩點半）。A 為地點、C 為主持人。',
        EL5: 'Would you like... 詢問是否加牛奶，回答 No, thank you. I prefer it plain（我喜歡原味/不加奶）最自然。',
        EL6: '男士提到已訓練三個月準備參加週日的半程馬拉松（half marathon），故選 B。',
        EL7: '女士說置物櫃裡有一把備用傘（extra one），代表她可以借傘給男士。',
        EL8: 'used to drive 表示過去開車，but now I take the MRT 表示現在改搭捷運。',
        EL9: '廣播提醒圖書館將於 15 分鐘後閉館，借書請立即至一樓櫃台（front desk on the first floor）。',
        EL10: '買兩條全麥麵包（two loaves of whole wheat bread）即贈送免費熱咖啡一杯。',
        ER1: 'as soon as（一…就…）連接時間副詞子句，符合一到辦公室就收信的語意。',
        ER2: '介系詞 before 後方接動名詞 V-ing（leaving）。',
        ER3: '距離捷運站步行僅五分鐘，代表交通非常便利（convenient）。',
        ER4: 'Neither A nor B 動詞需與靠近的主詞 B (my parents，複數) 一致，故用 like。',
        ER5: 'spend + 時間 + V-ing 為核心必考句型，故選 sitting。',
        ER6: '助動詞 can 後接原形動詞 improve，表達每週慢跑三次能夠促進心血管健康。',
        ER7: 'stay + 形容詞，補充水分有助於讓身體保持充滿活力（energetic）。',
        ER8: '公告第一句明確指出 closed for annual maintenance（年度維護保養）。',
        ER9: '室內跑道與健身房位於三樓（on the 3rd floor）。',
        ER10: '月票會員將自動獲得 5 天會籍展延（5-day extension）。',
        IL1: '圖表中 W-F 產線今日產出效率最高（highest output efficiency）。',
        IL2: '手沖萃取前咖啡師正在確認水溫與研磨粗細（water temperature and grind size）。',
        IL3: '以 Let us run one more stress test and deploy it on Friday 回應部署時程最切題。',
        IL4: 'How 詢問改善半馬配速的方法，B「持續追蹤心率區間與步頻」最符合運動科學邏輯。',
        IL5: 'Why 詢問延後原因，A「多位區域經理因颱風延誤」直接回答原因。',
        IL6: '於走廊增設 Mesh Wi-Fi 節點（mesh Wi-Fi node）可消除訊號死角。',
        IL7: '女士建議透過全球指數型 ETF 分散風險（diversify using a global index ETF）。',
        IL8: 'provided that 表達條件：「只要保證尖峰時段零停機（no service interruption）」。',
        IL9: '維護期間的批次作業將自動排入佇列（queue automatically），待重啟後繼續執行。',
        IL10: '淺焙豆使用 92~94 度較高水溫，能有效萃取出花香與果酸風味（floral and fruity notes）。',
        IR1: 'alleviated（緩解、減輕）產線瓶頸，符合智能排程系統帶來的效益。',
        IR2: '與過去事實相反的假設語氣倒裝（Had + S + Vpp），主要子句用 could have been + Vpp。',
        IR3: 'particularly（尤其、特別是）強調在市場劇烈波動時更需要紀律。',
        IR4: 'insist that + S + (should) + 原形動詞，故選原形 undergo。',
        IR5: 'delegate（委派、交辦）例行實作任務給 AI 代理，搭配介系詞 to。',
        IR6: '前後句為轉折語氣（「然而，人工監督依然不可或缺」），故選 Nevertheless。',
        IR7: 'combine A with B（將結構化規格與自動化驗證結合），固定搭配 with。',
        IR8: '研究指出業餘跑者常在輕鬆日跑太快、間歇日跑太慢。',
        IR9: '維持 175~185 步頻可減少關節衝擊力（minimize joint impact）。',
        IR10: '將 80% 週跑量維持在低強度 Zone 2 的跑者，半馬成績平均進步 7%。'
      };
      return {
        peerRate: peerRate,
        explanation: explanations[qid] || (isListening ? '建議多聽幾次語音連音與關鍵疑問詞，掌握上下文語意。' : '留意前後文時態、連接詞與關鍵字搭配即可快速解題。')
      };
    }

    function generateEncourageMessage(isCorrect, peerRate, streak, overallAccPct, totalAnswered) {
      let primaryMsg = '';
      let readinessMsg = '';

      if (isCorrect) {
        if (peerRate >= 75) {
          primaryMsg = `🎉 不錯喔~ 這題答對的比例佔大多數（約 ${peerRate}% 考生答對），基本功非常紮實！`;
        } else {
          primaryMsg = `🌟 太棒了！這題屬於進階題（全體僅 ${peerRate}% 答對），您竟然順利攻克了！`;
        }
      } else {
        if (peerRate >= 72) {
          primaryMsg = `💡 嗯... 這題應該要把握住喔~（全體約有 ${peerRate}% 的人答對），快看看下方解析把觀念記起來！`;
        } else {
          primaryMsg = `💪 別氣餒！這題陷阱比較多（答對率僅 ${peerRate}%），從錯誤中學習印象最深刻喔！`;
        }
      }

      if (totalAnswered >= 3 && overallAccPct >= 70) {
        readinessMsg = `🚀 加油喔，已經可以準備測驗考試的程度囉！（目前練習答對率 ${overallAccPct}%・連對 ${streak} 題）`;
      } else if (streak >= 2) {
        readinessMsg = `🔥 手感火熱！已經連續答對 ${streak} 題，加油喔，已經可以準備測驗考試的程度囉！`;
      } else if (totalAnswered >= 3 && overallAccPct < 70) {
        readinessMsg = `🌱 持續累積中（目前答對率 ${overallAccPct}%），多把上方「應該要把握住」的題目練熟，很快就能挑戰正式測驗囉！`;
      } else {
        readinessMsg = `✨ 練習模式不限時間，每做完一題都會給您專屬回饋，繼續加油喔！`;
      }

      return { primaryMsg, readinessMsg };
    }

    function computePracticeStats() {
      const p = state.practice;
      const bank = QUESTION_BANK[p.level];
      let totalAns = 0;
      let totalCorr = 0;

      bank.listening.forEach(q => {
        if (p.listeningAns[q.id] !== undefined) {
          totalAns++;
          if (p.listeningAns[q.id] === q.answer) totalCorr++;
        }
      });
      bank.reading.forEach(q => {
        if (p.readingAns[q.id] !== undefined) {
          totalAns++;
          if (p.readingAns[q.id] === q.answer) totalCorr++;
        }
      });

      const accPct = totalAns > 0 ? Math.round((totalCorr / totalAns) * 100) : 0;
      const sCount = Object.values(p.speakingRes).filter((sr) => sr && (Number(sr.score100) > 0 || sr.audioUrl || String(sr.transcript || '').trim())).length;
      return {
        totalAns,
        totalCorr,
        accPct,
        lCount: Object.keys(p.listeningAns).length,
        rCount: Object.keys(p.readingAns).length,
        sCount
      };
    }

    function updatePracticeEncourageBanner() {
      const banner = document.getElementById('practice-readiness-banner');
      if (!banner) return;
      const stats = computePracticeStats();
      const p = state.practice;

      let statusBadge = '🌱 暖身練習中';
      let readinessAdvice = '多做幾題聽力與閱讀，系統會根據您的答題狀況評估是否已達正式測驗水準！';
      if (stats.totalAns >= 3 && stats.accPct >= 70) {
        statusBadge = '🏆 已達應考標準';
        readinessAdvice = `加油喔，已經可以準備測驗考試的程度囉！您目前答對率達 ${stats.accPct}%（高於初試通過門檻 67%），隨時可挑戰 30 分鐘正式測驗！`;
      } else if (stats.totalAns >= 3) {
        statusBadge = '💪 實力養成中';
        readinessAdvice = `目前練習答對率為 ${stats.accPct}%，遇到「嗯... 這題應該要把握住喔~」的基礎題時多看解析，很快就能達標！`;
      }

      banner.innerHTML = `
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-xs font-bold">${statusBadge}</span>
            <span class="text-xs font-bold text-slate-800">${p.lastEncourageMsg}</span>
          </div>
          <p class="text-xs text-slate-600">${readinessAdvice}</p>
        </div>
        <div class="flex items-center gap-3 shrink-0 bg-white/90 px-3.5 py-2 rounded-xl border border-slate-200 text-xs">
          <div>已練習：<strong class="text-indigo-700">${stats.totalAns}</strong> 題</div>
          <div>答對率：<strong class="text-emerald-700">${stats.accPct}%</strong></div>
          <div>連續答對：<strong class="text-amber-600">🔥 ${p.streak}</strong></div>
        </div>
      `;

      document.getElementById('prac-badge-listening').textContent = `${stats.lCount} / 10 題`;
      document.getElementById('prac-badge-reading').textContent = `${stats.rCount} / 10 題`;
      document.getElementById('prac-badge-speaking').textContent = `${stats.sCount} / 5 題`;
      document.getElementById('prac-badge-writing').textContent = p.writingRes.score100 > 0 ? `${p.writingRes.score100} 分` : '自由演練';
    }

    function openPracticeMode(level) {
      if (!state.user || !state.user.loggedIn) {
        state.activeTab = 'practice';
        updateActiveView();
        return;
      }
      if (level) state.practice.level = level;
      state.activeTab = 'practice';
      renderPracticeWorkspace();
      updateActiveView();
    }

    function renderPracticeWorkspace() {
      releasePracticeMicForRerender();
      const p = state.practice;
      const bank = QUESTION_BANK[p.level];
      const pill = document.getElementById('practice-level-pill');
      if (pill) pill.textContent = `目前練習級別：${p.level} (${p.level === '初級' ? 'Elementary A2' : 'Intermediate B1'}) · 練習卷第 ${state.practiceRound[p.level] || 1} 回`;

      const btnElem = document.getElementById('btn-prac-switch-elem');
      const btnInter = document.getElementById('btn-prac-switch-inter');
      if (btnElem && btnInter) {
        if (p.level === '初級') {
          btnElem.className = 'px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm transition-colors';
          btnInter.className = 'px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors';
        } else {
          btnInter.className = 'px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm transition-colors';
          btnElem.className = 'px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors';
        }
      }

      const stageTabs = {
        listening: document.getElementById('prac-tab-listening'),
        reading: document.getElementById('prac-tab-reading'),
        speaking: document.getElementById('prac-tab-speaking'),
        writing: document.getElementById('prac-tab-writing')
      };
      Object.keys(stageTabs).forEach(k => {
        if (k === p.stage) {
          stageTabs[k].className = 'p-3 rounded-xl border text-left transition-all bg-indigo-600 text-white border-indigo-600 shadow-sm';
        } else {
          stageTabs[k].className = 'p-3 rounded-xl border text-left transition-all bg-white text-slate-700 border-slate-200 hover:border-indigo-400';
        }
      });

      updatePracticeEncourageBanner();

      const area = document.getElementById('practice-content-area');
      if (!area) return;
      area.innerHTML = '';

      if (p.stage === 'listening' || p.stage === 'reading') {
        const isListening = p.stage === 'listening';
        const qList = isListening ? bank.listening : bank.reading;
        const ansMap = isListening ? p.listeningAns : p.readingAns;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'stage-sticky-head stage-sticky-head-inset border-b border-slate-100 flex items-center justify-between flex-wrap gap-2';
        headerDiv.innerHTML = `
          <div>
            <h3 class="text-base font-bold text-slate-900">
              ${isListening ? '🎧 第一階段：聽力自主練習（可重播；作答後才顯示原文）' : '📖 第一階段：閱讀自主練習（詞彙、段落填空與雙文本）'}
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">點選任一選項後，系統會立即告訴您全體考生答對比例與專屬鼓勵訊息！</p>
          </div>
        `;
        area.appendChild(headerDiv);

        qList.forEach((q, idx) => {
          const userChoice = ansMap[q.id];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = hasAnswered && userChoice === q.answer;
          const meta = getQuestionMeta(q.id, idx, isListening);

          const card = document.createElement('div');
          card.className = 'p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3';

          const passageHtml = q.passage
            ? `<div class="p-3.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed mb-2">${q.passage}</div>`
            : '';

          let optionsHtml = '';
          q.options.forEach((opt, oIdx) => {
            let optStyle = 'bg-white border-slate-200 hover:border-indigo-400';
            if (hasAnswered) {
              if (oIdx === q.answer) {
                optStyle = 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950';
              } else if (oIdx === userChoice && !isCorrect) {
                optStyle = 'bg-rose-50 border-rose-400 font-semibold text-rose-900';
              }
            }
            optionsHtml += `
              <label class="flex items-center justify-between gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors text-xs sm:text-sm ${optStyle}">
                <span class="flex items-center gap-2">
                  <input type="radio" name="prac_${q.id}" value="${oIdx}" ${userChoice === oIdx ? 'checked' : ''} data-qid="${q.id}" data-idx="${idx}" class="prac-choice-radio text-indigo-600 focus:ring-indigo-500">
                  ${isListening ? listeningChoiceInner(q, opt, oIdx, hasAnswered) : `<span>${opt}</span>`}
                </span>
                ${hasAnswered && oIdx === q.answer ? '<span class="text-xs font-bold text-emerald-700">✓ 正解</span>' : ''}
                ${hasAnswered && oIdx === userChoice && !isCorrect ? '<span class="text-xs font-bold text-rose-600">✗ 您的選擇</span>' : ''}
              </label>
            `;
          });

          let feedbackHtml = '';
          if (hasAnswered) {
            const stats = computePracticeStats();
            const enc = generateEncourageMessage(isCorrect, meta.peerRate, p.streak, stats.accPct, stats.totalAns);
            const boxStyle = isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950';
            feedbackHtml = `
              <div class="p-3.5 rounded-xl border ${boxStyle} text-xs space-y-1.5">
                <div class="font-bold text-sm flex items-center justify-between flex-wrap gap-2">
                  <span>${enc.primaryMsg}</span>
                  <span class="px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-[11px] font-semibold">
                    📊 全體考生答對率：${meta.peerRate}%
                  </span>
                </div>
                <div class="text-slate-700 leading-relaxed">
                  <strong>📘 題目解析：</strong>${meta.explanation}
                  ${isListening ? `<br><strong>🎧 聽力原文：</strong><span class="font-mono text-indigo-900">${q.audioText}</span>` : ''}
                </div>
                <div class="pt-1 text-indigo-800 font-semibold">${enc.readinessMsg}</div>
              </div>
            `;
          }

          card.innerHTML = `
            <div class="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <span class="text-[11px] font-bold text-indigo-600 uppercase">${q.part}</span>
                <h4 class="text-sm font-bold text-slate-900 mt-0.5">第 ${idx + 1} 題${isListening ? '' : '：' + q.prompt}</h4>
                ${isListening ? `<p class="text-xs text-slate-600 mt-0.5">${listeningInstruction(q)}</p>` : ''}
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">歷屆答對率約 ${meta.peerRate}%</span>
                ${isListening ? `
                  <button type="button" data-audio="${encodeURIComponent(q.audioText)}" class="btn-prac-play-audio px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm">
                    🔊 播放聽力音檔 (不限次數)
                  </button>
                ` : ''}
              </div>
            </div>
            ${passageHtml}
            ${isListening ? listeningStemHtml(q) : ''}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${optionsHtml}
            </div>
            ${feedbackHtml}
          `;
          area.appendChild(card);
        });

        area.querySelectorAll('.btn-prac-play-audio').forEach(btn => {
          btn.addEventListener('click', () => {
            const text = decodeURIComponent(btn.getAttribute('data-audio'));
            btn.textContent = '🔊 語音播放中...';
            btn.disabled = true;
            speakEnglishOnce(text, p.level === '初級' ? 0.92 : 1.0, () => {
              btn.textContent = '🔊 再次播放聽力音檔';
              btn.disabled = false;
            });
          });
        });

        area.querySelectorAll('.prac-choice-radio').forEach(radio => {
          radio.addEventListener('change', () => {
            const qid = radio.getAttribute('data-qid');
            const idx = Number(radio.getAttribute('data-idx'));
            const val = Number(radio.value);
            const q = qList.find(item => item.id === qid);
            ansMap[qid] = val;

            const isCorrect = val === q.answer;
            if (isCorrect) p.streak++;
            else p.streak = 0;

            const meta = getQuestionMeta(qid, idx, isListening);
            const stats = computePracticeStats();
            const enc = generateEncourageMessage(isCorrect, meta.peerRate, p.streak, stats.accPct, stats.totalAns);
            p.lastEncourageMsg = `${enc.primaryMsg} ${enc.readinessMsg}`;

            renderPracticeWorkspace();
            showToast(isCorrect ? '🎉 答對了！繼續保持！' : '💡 沒關係，看解析學起來！', `${enc.primaryMsg}
${enc.readinessMsg}`, isCorrect ? 'emerald' : 'amber');
          });
        });
      } else if (p.stage === 'speaking') {
        const headerDiv = document.createElement('div');
        headerDiv.className = 'stage-sticky-head stage-sticky-head-inset border-b border-slate-100';
        headerDiv.innerHTML = `
          <h3 class="text-base font-bold text-slate-900">🎙️ 第二階段：二階音聽口說自主練習（可隨時查看題目文字・語音辨識評分）</h3>
          <p class="text-xs text-slate-500 mt-0.5">按下紅色按鈕會開啟麥克風，依題目秒數錄音。說完可再按一次停止，並播放自己的錄音。</p>
        `;
        area.appendChild(headerDiv);

        bank.speaking.forEach((q, idx) => {
          if (!p.speakingRes[q.id]) {
            p.speakingRes[q.id] = { transcript: '', score100: 0, encourageText: '' };
          }
          const sr = p.speakingRes[q.id];
          const card = document.createElement('div');
          card.className = 'p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3';
          card.innerHTML = `
            <div class="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <span class="text-[11px] font-bold text-indigo-600 uppercase">${q.part}</span>
                <h4 class="text-sm font-bold text-slate-900 mt-0.5">口說練習第 ${idx + 1} 題：${q.instruction}</h4>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold ${sr.score100 >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}">
                練習評分：${sr.score100 > 0 ? sr.score100 + ' / 100' : '尚未錄音'}
              </span>
            </div>
            ${(q.part || '').indexOf('看圖') >= 0 ? `<div class="flex flex-col sm:flex-row gap-3 items-start p-3 rounded-lg bg-white border border-indigo-200">${getListeningSvg(q.svgType || 'balance', 'w-36 h-28')}<ol class="list-decimal pl-4 text-xs text-slate-800 space-y-1">${(q.printedQuestions || []).map(text => '<li>' + text + '</li>').join('')}</ol></div>` : ''}
            <div class="p-3 rounded-lg bg-white border border-indigo-100 text-xs sm:text-sm text-slate-800">
              <strong>🎧 練習可看原文：</strong>${q.audioText}
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <button type="button" data-audio="${encodeURIComponent(q.audioText)}" class="btn-prac-speak-audio px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
                🎧 播放示範音檔 (連播 2 次)
              </button>
              <button type="button" data-qid="${q.id}" data-idx="${idx}" class="btn-prac-speak-record px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">
                🎙️ 點擊錄音開口練習
              </button>
            </div>
            <p id="prac-rec-status-${q.id}" class="text-xs font-medium text-slate-600">${sr.audioUrl ? '錄音已存好，可按下方播放回聽。' : '按下錄音後請允許麥克風，並用英語作答。'}</p>
            ${sr.audioUrl ? `<audio controls preload="none" src="${sr.audioUrl}" class="w-full"></audio>` : ''}
            <div class="flex flex-col sm:flex-row gap-2">
              <input type="text" data-qid="${q.id}" value="${sr.transcript.replace(/"/g, '&quot;')}"
                placeholder="錄音後自動轉譯或直接輸入您的口說句子以獲得鼓勵回饋..."
                class="input-prac-speak flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white">
              <button type="button" data-qid="${q.id}" class="btn-prac-speak-eval px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold">
                AI 鼓勵講評
              </button>
            </div>
            ${sr.encourageText ? `<div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">${sr.encourageText}</div>` : ''}
          `;
          area.appendChild(card);
        });

        area.querySelectorAll('.btn-prac-speak-audio').forEach(btn => {
          btn.addEventListener('click', () => {
            const text = decodeURIComponent(btn.getAttribute('data-audio'));
            btn.textContent = '🔊 第 1 次播音中...';
            btn.disabled = true;
            speakEnglishOnce(text, p.level === '初級' ? 0.92 : 1.0, () => {
              btn.textContent = '⏳ 間隔 1.5 秒...';
              setTimeout(() => {
                btn.textContent = '🔊 第 2 次播音中...';
                speakEnglishOnce(text, p.level === '初級' ? 0.92 : 1.0, () => {
                  playBeepTone(1046, 220);
                  btn.textContent = '🎧 重新播放示範音檔 (連播 2 次)';
                  btn.disabled = false;
                });
              }, 1500);
            });
          });
        });

        area.querySelectorAll('.input-prac-speak').forEach(inp => {
          inp.addEventListener('input', () => {
            const qid = inp.getAttribute('data-qid');
            p.speakingRes[qid].transcript = inp.value;
          });
        });

        const evalSpeakPractice = (qid) => {
          const q = bank.speaking.find(item => item.id === qid);
          const sr = p.speakingRes[qid];
          if (!sr || !String(sr.transcript || '').trim()) {
            showToast('請先開口或輸入', '按「點擊錄音開口練習」說英語，或在框內打上你說的句子，再按 AI 鼓勵講評。', 'amber');
            return;
          }
          const tempObj = { transcript: sr.transcript, fluencyBand: 0, grammarBand: 0, score100: 0 };
          gradeSingleSpeakingItem(q, tempObj);
          sr.score100 = tempObj.score100;
          if (sr.score100 >= 80) {
            p.streak++;
            sr.encourageText = `🎉 不錯喔~ 這題口說流利度與關鍵字掌握得很好（得分 ${sr.score100}/100，約佔高分群前 82%）！加油喔，已經可以準備測驗考試的程度囉！`;
          } else {
            sr.encourageText = `💡 嗯... 這題關鍵字應該要把握住喔~ 建議包含關鍵字：${q.expectedKeywords.slice(0, 5).join(', ')}，多開口朗讀兩次就會非常流暢囉！`;
          }
          p.lastEncourageMsg = sr.encourageText;
          renderPracticeWorkspace();
          showToast('🎙️ 口說練習回饋', sr.encourageText, sr.score100 >= 80 ? 'emerald' : 'amber');
        };

        area.querySelectorAll('.btn-prac-speak-record').forEach(btn => {
          btn.addEventListener('click', async () => {
            const qid = btn.getAttribute('data-qid');
            const q = bank.speaking.find(item => item.id === qid);
            const statusEl = document.getElementById(`prac-rec-status-${qid}`);
            const inputEl = area.querySelector(`.input-prac-speak[data-qid="${qid}"]`);

            if (activeMicCapture && activeMicCapture.stopping) return;
            if (activeMicCapture && activeMicCapture.qid === qid) {
              activeMicCapture.stop();
              return;
            }
            if (activeMicCapture) activeMicCapture.stop();
            stopEnglishSpeech();

            area.querySelectorAll('.btn-prac-speak-record').forEach((other) => {
              other.textContent = '🎙️ 點擊錄音開口練習';
            });
            btn.textContent = '⏳ 正在開啟麥克風...';
            if (statusEl) statusEl.textContent = '請允許麥克風，接著用英語作答。';

            const session = startEnglishMicCapture({
              seconds: (q && q.timeLimitSec) || 15,
              owner: 'practice',
              qid,
              onStart() { playBeepTone(880, 160); },
              onUpdate({ transcript, remaining }) {
                btn.textContent = `⏹️ 停止錄音（剩 ${remaining} 秒）`;
                if (statusEl) {
                  statusEl.textContent = transcript
                    ? `錄音中，剩餘 ${remaining} 秒｜${transcript}`
                    : `錄音中，剩餘 ${remaining} 秒。請說英語。`;
                }
                if (transcript && inputEl) {
                  inputEl.value = transcript;
                  if (p.speakingRes[qid]) p.speakingRes[qid].transcript = transcript;
                }
              }
            });
            activeMicCapture = session;
            const result = await session.done;
            const stillCurrent = activeMicCapture === session;
            if (stillCurrent) activeMicCapture = null;
            const sr = p.speakingRes[qid];
            if (sr && result && !result.error) {
              if (result.audioUrl) {
                if (sr.audioUrl) URL.revokeObjectURL(sr.audioUrl);
                sr.audioUrl = result.audioUrl;
              }
              if (result.transcript) sr.transcript = result.transcript;
            }
            if (!stillCurrent) return;
            if (!result || result.error === 'cancelled') return;
            if (result.error) {
              if (statusEl) statusEl.textContent = result.message;
              btn.textContent = '🎙️ 點擊錄音開口練習';
              showToast('錄音無法使用', result.message, 'amber');
              return;
            }
            playBeepTone(523, 180);
            if (sr && String(sr.transcript || '').trim()) {
              evalSpeakPractice(qid);
            } else {
              renderPracticeWorkspace();
              showToast(
                '已存下錄音',
                result.recognitionSupported
                  ? '這次沒有辨識到英語。可以播放回聽，或把句子打在框裡再按「AI 鼓勵講評」。'
                  : '這個瀏覽器無法把語音轉成文字。請播放錄音確認，再把英語打在框裡評分。',
                'amber'
              );
            }
          });
        });

        area.querySelectorAll('.btn-prac-speak-eval').forEach(btn => {
          btn.addEventListener('click', () => {
            evalSpeakPractice(btn.getAttribute('data-qid'));
          });
        });
      } else if (p.stage === 'writing') {
        const bankW = bank.writing;
        const wr = p.writingRes;
        const isElem = p.level === '初級';
        const qAttr = (value) => String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
        const headerDiv = document.createElement('div');
        headerDiv.className = 'stage-sticky-head stage-sticky-head-inset border-b border-slate-100';
        headerDiv.innerHTML = `
          <h3 class="text-base font-bold text-slate-900">✍️ 第二階段：寫作自主練習與 AI 批改</h3>
          <p class="text-xs text-slate-500 mt-0.5">${isElem ? '單句寫作 3 題＋看圖段落寫作' : '中譯英＋英文作文'}。各題可填入參考範例觀摩，作文寫完後再取得鼓勵回饋。</p>
        `;
        area.appendChild(headerDiv);

        const sentValues = [wr.s1 || '', wr.s2 || '', wr.s3 || ''];
        let taskHtml = '';
        if (isElem && bankW.sentences) {
          const sentencesHtml = bankW.sentences.map((sq, idx) => `
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div class="flex items-start justify-between gap-2">
                <span class="text-xs font-bold text-indigo-700">${String(sq.prompt || '').replace(/\n/g, '<br>')}</span>
                <button type="button" data-sidx="${idx}" class="btn-prac-fill-sent text-[11px] text-indigo-600 hover:underline shrink-0">填入參考範例</button>
              </div>
              <input type="text" data-sidx="${idx}" value="${qAttr(sentValues[idx])}"
                placeholder="請輸入完整英文句子..."
                class="prac-writing-sent w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
          `).join('');
          taskHtml = `
            <div class="space-y-3">
              <h4 class="text-sm font-bold text-slate-900">第一部分：單句寫作</h4>
              ${sentencesHtml}
            </div>
          `;
        } else if (bankW.translation) {
          taskHtml = `
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div class="flex items-center justify-between gap-2">
                <h4 class="text-sm font-bold text-slate-900">${bankW.translation.title}</h4>
                <button type="button" id="btn-prac-fill-trans" class="text-xs text-indigo-600 hover:underline font-medium shrink-0">填入參考範例</button>
              </div>
              <p class="text-xs text-slate-700 whitespace-pre-line leading-relaxed">${bankW.translation.prompt}</p>
              <textarea id="prac-trans-textarea" rows="3" placeholder="請輸入英文翻譯..."
                class="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">${qAttr(wr.trans)}</textarea>
            </div>
          `;
        }

        const card = document.createElement('div');
        card.className = 'space-y-4';
        card.innerHTML = `
          ${taskHtml}
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <h4 class="text-sm font-bold text-slate-900">${bankW.essay.title}</h4>
              <button type="button" id="btn-prac-fill-essay" class="text-xs text-indigo-600 hover:underline font-medium">填入參考範例</button>
            </div>
            ${bankW.essay.svgType ? `<div class="flex items-center gap-3">${getListeningSvg(bankW.essay.svgType, 'w-36 h-28')}<p class="text-[11px] text-slate-500">看圖寫作：請描述圖中的情景。</p></div>` : ''}
            <p class="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-line">${bankW.essay.prompt}</p>
            <textarea id="prac-essay-textarea" rows="${isElem ? 4 : 5}" placeholder="請在此自由練習英文寫作..."
              class="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">${qAttr(wr.essay)}</textarea>
            <div class="flex items-center justify-between flex-wrap gap-2">
              <span class="text-xs text-slate-500">建議字數：至少 ${bankW.essay.minWords} 字</span>
              <button type="button" id="btn-prac-grade-writing" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm">
                🤖 取得鼓勵回饋與寫作評分
              </button>
            </div>
          </div>
          ${wr.feedbackMsg ? `<div class="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 font-semibold leading-relaxed">${wr.feedbackMsg}</div>` : ''}
        `;
        area.appendChild(card);

        card.querySelectorAll('.prac-writing-sent').forEach(inp => {
          inp.addEventListener('input', () => {
            const idx = Number(inp.getAttribute('data-sidx'));
            if (idx === 0) wr.s1 = inp.value;
            if (idx === 1) wr.s2 = inp.value;
            if (idx === 2) wr.s3 = inp.value;
          });
        });
        card.querySelectorAll('.btn-prac-fill-sent').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-sidx'));
            const sample = bankW.sentences[idx] && bankW.sentences[idx].sample;
            if (!sample) return;
            if (idx === 0) wr.s1 = sample;
            if (idx === 1) wr.s2 = sample;
            if (idx === 2) wr.s3 = sample;
            renderPracticeWorkspace();
          });
        });
        const transArea = document.getElementById('prac-trans-textarea');
        if (transArea) {
          transArea.addEventListener('input', () => {
            wr.trans = transArea.value;
          });
        }
        const fillTransBtn = document.getElementById('btn-prac-fill-trans');
        if (fillTransBtn && bankW.translation) {
          fillTransBtn.addEventListener('click', () => {
            wr.trans = bankW.translation.sample;
            renderPracticeWorkspace();
          });
        }
        const ta = document.getElementById('prac-essay-textarea');
        if (ta) {
          ta.addEventListener('input', () => {
            wr.essay = ta.value;
          });
        }
        const fillEssayBtn = document.getElementById('btn-prac-fill-essay');
        if (fillEssayBtn && bankW.essay) {
          fillEssayBtn.addEventListener('click', () => {
            wr.essay = bankW.essay.sample;
            renderPracticeWorkspace();
          });
        }
        document.getElementById('btn-prac-grade-writing').addEventListener('click', () => {
          const words = (wr.essay || '').trim() ? (wr.essay || '').trim().split(/\s+/).length : 0;
          if (words >= bankW.essay.minWords) {
            wr.score100 = 86;
            p.streak++;
            wr.feedbackMsg = `🎉 不錯喔~ 這篇寫作字數達 ${words} 字，結構完整、句型流暢（預估可拿 ${wr.score100} 分，超過 85% 練習者）！加油喔，已經可以準備測驗考試的程度囉！`;
          } else if (words > 0) {
            wr.score100 = 68;
            wr.feedbackMsg = `💡 嗯... 這題字數與細節應該要把握住喔~ 目前僅 ${words} 字（建議達 ${bankW.essay.minWords} 字以上），可按各題的「填入參考範例」觀摩句型與連接詞！`;
          } else {
            wr.score100 = 0;
            wr.feedbackMsg = `✨ 請先輸入幾個英文句子，或按各題的「填入參考範例」開始觀摩喔！`;
          }
          p.lastEncourageMsg = wr.feedbackMsg;
          renderPracticeWorkspace();
          showToast('✍️ 寫作練習鼓勵回饋', wr.feedbackMsg, wr.score100 >= 75 ? 'emerald' : 'amber');
        });
      }
    }


    // =========================================================================
    // 7.8 GEMINI API & DYNAMIC PARAMETERIZED QUESTION GENERATOR (方案 3 動態命題引擎)
    // =========================================================================
    function shuffleArrayWithAnswer(optionsPlain, correctIdx, parallel) {
      const items = optionsPlain.map((text, idx) => ({
        text: text,
        isCorrect: idx === correctIdx,
        extra: parallel ? parallel[idx] : null
      }));
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
      }
      const prefixes = ['A. ', 'B. ', 'C. ', 'D. '];
      const newOptions = items.map((it, idx) => prefixes[idx] + String(it.text).replace(/^[A-D]\.\s*/, ''));
      const newAnswer = items.findIndex(it => it.isCorrect);
      return { options: newOptions, answer: newAnswer, extras: parallel ? items.map(it => it.extra) : null };
    }

    function pickRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function topicTag(topic) {
      const t = topic || '';
      if (t.includes('路跑')) return 'run';
      if (t.includes('咖啡')) return 'coffee';
      if (t.includes('排程') || t.includes('科技')) return 'tech';
      if (t.includes('高雄') || t.includes('在地') || t.includes('通勤')) return 'city';
      return 'all';
    }

    function poolFor(pool, topic) {
      const tag = topicTag(topic);
      if (tag === 'all') return pool;
      const matched = pool.filter(item => item.tags && (item.tags.includes(tag) || item.tags.includes('all')));
      return matched.length >= 2 ? matched : pool;
    }

    function snapshotPracticeStems(level) {
      if (!state.practiceStemKeys) state.practiceStemKeys = {};
      const bag = {};
      const prefix = level + '-';
      Object.keys(state.pickedSlotKeys || {}).forEach((key) => {
        if (key.indexOf(prefix) === 0) bag[key] = state.pickedSlotKeys[key];
      });
      state.practiceStemKeys[level] = bag;
    }

    function pickFresh(pool, slotKey) {
      if (!state.pickedSlotKeys) state.pickedSlotKeys = {};
      const level = slotKey.split('-')[0];
      const practiceBag = state.examUsePracticeBlock && state.practiceStemKeys
        ? state.practiceStemKeys[level]
        : null;
      const blockedKey = practiceBag ? practiceBag[slotKey] : '';
      let choices = pool;
      if (blockedKey && pool.length > 1) {
        const filtered = pool.filter(item => item.k !== blockedKey);
        if (filtered.length) choices = filtered;
      } else {
        const last = state.pickedSlotKeys[slotKey];
        if (last && pool.length > 1) choices = pool.filter(item => item.k !== last);
      }
      const picked = choices[Math.floor(Math.random() * choices.length)];
      state.pickedSlotKeys[slotKey] = picked.k;
      return picked;
    }

    function mc(k, prompt, opts, ok, why, rate, svg, audio, tags, extra) {
      const item = { k: k, prompt: prompt, opts: opts, ok: ok, why: why, rate: rate };
      if (svg) item.svg = svg;
      if (audio) item.audio = audio;
      if (tags) item.tags = tags;
      if (extra) Object.assign(item, extra);
      return item;
    }

    function emitMcq(slotKey, pool, topic, id, part) {
      const item = pickFresh(poolFor(pool, topic), slotKey);
      const shuf = shuffleArrayWithAnswer(item.opts, item.ok, item.optionSvgs);
      state.dynamicMetaMap[id] = { peerRate: item.rate, explanation: item.why };
      const q = { id: id, part: part, prompt: item.prompt, options: shuf.options, answer: shuf.answer, stemKey: item.k };
      if (item.svg) q.svgType = item.svg;
      if (item.passage) q.passage = item.passage;
      if (item.chartHtml) q.chartHtml = item.chartHtml;
      if (item.optionSvgs) q.optionSvgs = shuf.extras;
      if (item.audio) q.audioText = item.audio;
      else if (item.svg) q.audioText = 'Look at the picture. ' + shuf.options.join(' ');
      return q;
    }

    function emitGroup(slotKey, sets, topic, idPrefix, part, startNum, genRound) {
      const set = pickFresh(poolFor(sets, topic), slotKey);
      return set.items.map((item, i) => {
        const id = idPrefix + (startNum + i) + '_G' + genRound;
        const shuf = shuffleArrayWithAnswer(item.opts, item.ok);
        state.dynamicMetaMap[id] = { peerRate: item.rate, explanation: item.why };
        const q = { id: id, part: part, prompt: item.prompt, options: shuf.options, answer: shuf.answer, stemKey: set.k };
        if (i === 0 && set.passage) q.passage = set.passage;
        return q;
      });
    }

    function emitSpeaking(slotKey, sets, topic, idPrefix, genRound) {
      const set = pickFresh(poolFor(sets, topic), slotKey);
      return set.items.map((item, i) => Object.assign({ id: idPrefix + (i + 1) + '_G' + genRound, stemKey: set.k }, item));
    }

    function emitWriting(slotKey, sets, topic, idPrefix, genRound) {
      const set = pickFresh(poolFor(sets, topic), slotKey);
      const writing = {};
      if (set.sentences) {
        writing.sentences = set.sentences.map((s, i) => Object.assign({ id: idPrefix + (i + 1) + '_G' + genRound, stemKey: set.k }, s));
      }
      if (set.essay) writing.essay = Object.assign({ id: idPrefix + 'ESSAY_G' + genRound, stemKey: set.k }, set.essay);
      if (set.translation) writing.translation = Object.assign({ id: idPrefix + 'TRANS_G' + genRound, stemKey: set.k }, set.translation);
      return writing;
    }

    function buildParameterizedQuestionSet(level, topic, genRound) {
      const ask = '請聽英語問句，選出最適合的回答：';
      const pic = '請聽語音並根據圖片選出最符合的描述：';
      const dlg = '請聽對話與問題，選出最適合的答案：';
      const talk = '請聽短文，選出最適合的答案：';
      if (level === '初級') {
        const listening = [
          emitMcq('初級-L1', [
            mc('el1a', pic, ['The man is making pour-over coffee.', 'The man is fixing a bicycle.', 'The man is washing a car.'], 0, '圖中人物正在手沖咖啡。', 86, 'coffee', null, ['coffee', 'all']),
            mc('el1b', pic, ['A clerk is packing bread into a paper bag.', 'A clerk is driving a bus.', 'A clerk is swimming in a pool.'], 0, '圖中是店員把麵包裝進紙袋。', 83, 'coffee', null, ['coffee', 'city']),
            mc('el1c', pic, ['The woman is tying her running shoes.', 'The woman is cooking soup.', 'The woman is reading a newspaper on a train.'], 0, '圖中人物正在綁跑鞋，準備起跑。', 85, 'runner', null, ['run', 'city'])
          ], topic, 'EL1_G' + genRound, '第一部分：看圖辨義'),
          emitMcq('初級-L2', [
            mc('el2a', '請聽語音：跑道旁的人正在做什麼？', ['The runners are stretching beside the track.', 'The runners are buying movie tickets.', 'The runners are painting a wall.'], 0, '第二題圖意是跑道旁暖身，不是買票或油漆。', 84, 'runner', null, ['run', 'city']),
            mc('el2b', '請聽語音：河岸邊的人正在做什麼？', ['A boy is jogging along the riverside path.', 'A boy is taking a nap on the sofa.', 'A boy is feeding birds at the zoo.'], 0, '第二題正解是沿著河岸慢跑。', 82, 'runner', null, ['run', 'city']),
            mc('el2c', '請聽語音：起跑線上的隊伍在做什麼？', ['The team is waiting at the starting line of a road race.', 'The team is boarding an airplane.', 'The team is having a math test.'], 0, '第二題是路跑起跑線，不是登機或考試。', 80, 'runner', null, ['run']),
            mc('el2d', '請聽語音：吧台後方的人正在做什麼？', ['The barista is pouring hot water in slow circles.', 'The barista is repairing a computer.', 'The barista is riding a scooter.'], 0, '第二題圖意是咖啡師繞圈注水。', 83, 'coffee', null, ['coffee']),
            mc('el2e', '請聽語音：這位客人手上拿著什麼？', ['A customer is holding a cup of iced coffee.', 'A customer is washing the windows.', 'A customer is catching a train.'], 0, '第二題是顧客手持冰咖啡。', 81, 'coffee', null, ['coffee', 'city'])
          ], topic, 'EL2_G' + genRound, '第一部分：看圖辨義'),
          emitMcq('初級-L3', [
            mc('el3a', ask, ['It is seven hundred dollars.', 'Platform three is downstairs.', 'I go there every Sunday.'], 0, 'How much 詢問票價，所以回答金額。', 83, null, 'Excuse me, how much is the bus ticket to Tainan?'),
            mc('el3b', ask, ['It opens at nine in the morning.', 'Yes, I like blue shirts.', 'The coffee is on the table.'], 0, 'What time 詢問開門時間。', 85, null, 'What time does the city library open on Saturday?'),
            mc('el3c', ask, ['Turn left and walk for two blocks.', 'It costs fifty dollars.', 'She is my English teacher.'], 0, 'Where 詢問地點，回答怎麼走。', 78, null, 'Where can I buy a bottle of water near the park?')
          ], topic, 'EL3_G' + genRound, '第二部分：問答'),
          emitMcq('初級-L4', [
            mc('el4a', ask, ['At four thirty.', 'In the meeting room.', 'Mr. Chen will speak.'], 0, 'When 詢問時間點，地點與主講人是干擾項。', 86, null, 'When does the class meeting start this afternoon?'),
            mc('el4b', ask, ['Next Friday.', 'By MRT.', 'Because it is raining.'], 0, 'When 詢問日期，交通方式與原因都不對。', 80, null, 'When are you going to visit your grandparents?'),
            mc('el4c', ask, ['For about ten minutes.', 'At the sports center.', 'Yes, I bought new shoes.'], 0, 'How long 詢問一段時間。', 77, null, 'How long do you warm up before you run?')
          ], topic, 'EL4_G' + genRound, '第二部分：問答'),
          emitMcq('初級-L5', [
            mc('el5a', ask, ['No, thank you. I like it plain.', 'Yes, I went there yesterday.', 'The shop closes at eight.'], 0, 'Would you like 是邀請，婉拒並說明喜好最自然。', 81, null, 'Would you like some sugar in your lemon tea?'),
            mc('el5b', ask, ['Yes, a small cup of hot tea, please.', 'The train leaves from platform two.', 'I finished my homework.'], 0, '詢問想喝什麼，應點飲料。', 84, null, 'Would you like hot tea or iced coffee?'),
            mc('el5c', ask, ['Sure. I can lend you mine.', 'It is across from the bank.', 'I run three times a week.'], 0, '請求借傘，答應出借才切題。', 79, null, 'May I borrow your umbrella for a minute?')
          ], topic, 'EL5_G' + genRound, '第二部分：問答'),
          emitMcq('初級-L6', [
            mc('el6a', dlg, ['He will join a morning road race.', 'He will stay in bed all day.', 'He will fly to another city.'], 0, '男士說週日要參加路跑。', 82, null, 'Woman: Are you free this Sunday morning? Man: I am joining a five-kilometer road race at the riverside. Question: What will the man do on Sunday?'),
            mc('el6b', dlg, ['She is going to the bookstore after class.', 'She is going to the airport.', 'She is going to repair a car.'], 0, '女士說下課後要去書店買筆記本。', 80, null, 'Man: Where are you going after class? Woman: I need a new notebook, so I am going to the bookstore. Question: Where is the woman going?'),
            mc('el6c', dlg, ['They will meet at the coffee shop at noon.', 'They will cancel the meeting.', 'They will cook dinner at school.'], 0, '對話約定中午在咖啡店見面。', 78, null, 'Woman: Can we meet at the coffee shop at noon? Man: Yes, I will wait for you by the window. Question: What did they decide?')
          ], topic, 'EL6_G' + genRound, '第三部分：簡短對話'),
          emitMcq('初級-L7', [
            mc('el7a', dlg, ['The weather got too hot for a picnic.', 'The bus ticket was too expensive.', 'The library was closed on Monday.'], 0, '他們因為天氣太熱而改期野餐。', 76, null, 'Man: Why did you move the family picnic to next week? Woman: It was too hot, and there was no shade in the park. Question: Why was the picnic moved?'),
            mc('el7b', dlg, ['She missed the bus and walked to school.', 'She drove a new car to school.', 'She stayed home and watched a movie.'], 0, '女士沒趕上公車，所以走路到學校。', 81, null, 'Man: You look tired. Did you run to school? Woman: No, I missed the bus and walked all the way. Question: How did the woman get to school?'),
            mc('el7c', dlg, ['He wants a table near the window.', 'He wants to return a broken cup.', 'He wants to buy a train ticket.'], 0, '男士向店員要求靠窗座位。', 83, null, 'Man: Excuse me, could we have a table near the window? Woman: Of course. Please follow me. Question: What does the man want?')
          ], topic, 'EL7_G' + genRound, '第三部分：簡短對話'),
          emitMcq('初級-L8', [
            mc('el8a', dlg, ['By metro.', 'By taxi.', 'By bicycle.'], 0, '男士說現在改搭捷運上班。', 88, null, 'Woman: Do you still drive to work? Man: No, I take the metro now because parking is difficult. Question: How does the man go to work now?'),
            mc('el8b', dlg, ['She will call her mother tonight.', 'She will buy a new phone tomorrow.', 'She will leave her bag on the bus.'], 0, '女士說今晚要打電話給媽媽。', 77, null, 'Man: Did you talk to your mother today? Woman: Not yet. I will call her tonight after dinner. Question: What will the woman do tonight?'),
            mc('el8c', dlg, ['The game was moved indoors because of rain.', 'The game started one hour early.', 'The players forgot the ball.'], 0, '下雨所以比賽改到室內。', 79, null, 'Woman: Is the basketball game still in the park? Man: No, it is raining, so we moved it to the school gym. Question: What happened to the game?')
          ], topic, 'EL8_G' + genRound, '第三部分：簡短對話'),
          emitMcq('初級-L9', [
            mc('el9a', talk, ['Before six ten.', 'After seven thirty.', 'At noon.'], 0, '廣播要求六點十分前完成寄物，對應時鐘 6:10。', 74, null, 'Attention, runners. Please leave your bags at the help desk before six ten. The race starts at six thirty. Question: Which clock shows the latest time to leave the bags?', ['run', 'all'], { optionSvgs: ['t610', 't730', 'noon'] }),
            mc('el9b', talk, ['Go to the front desk now.', 'Come back next month.', 'Use the computers upstairs.'], 0, '圖書館即將關門，借書要立刻到櫃台。', 82, null, 'The library will close in ten minutes. If you want to borrow books tonight, please bring them to the front desk now. Question: Which picture matches what visitors should do?', ['all'], { optionSvgs: ['desk', 'month', 'computer'] }),
            mc('el9c', talk, ['The museum is free on Wednesday mornings.', 'The museum is closed all year.', 'Tickets are only sold on Sunday night.'], 0, '週三上午博物館免費入場，不是整年關閉或只在週日晚上賣票。', 80, null, 'Welcome to the city museum. Admission is free on Wednesday mornings from nine to twelve. Other days, tickets cost one hundred dollars. Question: Which picture matches the announcement?', ['city', 'all'], { optionSvgs: ['card', 'closed', 'night'] })
          ], topic, 'EL9_G' + genRound, '第四部分：短文聽解'),
          emitMcq('初級-L10', [
            mc('el10a', talk, ['Buy two loaves of bread.', 'Arrive after eight.', 'Order a chocolate cake only.'], 0, '買兩條麵包才送咖啡。', 81, null, 'Sunny Bakery special: buy two loaves of bread before eight and get a free cup of hot coffee. Question: Which picture shows how to get a free coffee?', ['coffee', 'all'], { optionSvgs: ['bread', 'night', 'cake'] }),
            mc('el10b', talk, ['On Monday.', 'On Saturday.', 'Every morning.'], 0, '語音說週一公休。', 84, null, 'Thank you for calling Green Leaf Cafe. We are open from Tuesday to Sunday, and we are closed on Monday. Question: Which picture shows the closed day?', ['coffee', 'city'], { optionSvgs: ['monday', 'saturday', 'everyday'] }),
            mc('el10c', talk, ['Bring a student card.', 'Come with three friends.', 'Pay in cash only.'], 0, '學生證可享半價。', 78, null, 'The sports center pool is half price for students. Please bring your student card to the ticket window. Question: Which picture shows what students should bring?', ['run', 'all'], { optionSvgs: ['card', 'friends', 'cash'] })
          ], topic, 'EL10_G' + genRound, '第四部分：短文聽解')
        ];

        const readingSingles = [
          emitMcq('初級-R1', [
            mc('er1a', 'The new bakery is very ______; it is only a three-minute walk from the metro.', ['convenient', 'nervous', 'bitter', 'ancient'], 0, '走路三分鐘就到，用 convenient（方便的）。', 88),
            mc('er1b', 'Please be ______ in the reading room. People are studying.', ['quiet', 'expensive', 'salty', 'wooden'], 0, '閱讀室要安靜，用 quiet。', 86),
            mc('er1c', 'This lemon juice tastes too ______. Please add a little water.', ['sour', 'polite', 'crowded', 'heavy'], 0, '檸檬汁太酸，用 sour。', 84)
          ], topic, 'ER1_G' + genRound, '第一部分：詞彙'),
          emitMcq('初級-R2', [
            mc('er2a', 'The night market was so ______ that we could not walk quickly.', ['crowded', 'delicious', 'private', 'fresh'], 0, '人多到走不快，用 crowded。', 85),
            mc('er2b', 'I felt ______ after a short jog and a glass of water.', ['energetic', 'expensive', 'narrow', 'ancient'], 0, '跑完又喝水後有精神，用 energetic。', 83),
            mc('er2c', 'The morning air in the park felt ______, so we stayed for another walk.', ['fresh', 'expensive', 'private', 'wooden'], 0, '清晨空氣清新，用 fresh。', 82),
            mc('er2d', 'Could you ______ me the way to the post office?', ['tell', 'borrow', 'close', 'taste'], 0, '問路用 tell someone the way。', 80)
          ], topic, 'ER2_G' + genRound, '第一部分：詞彙'),
          emitMcq('初級-R3', [
            mc('er3a', 'We need a ______ of whole wheat bread for breakfast.', ['loaf', 'ticket', 'platform', 'umbrella'], 0, '一條麵包用 a loaf of bread。', 84),
            mc('er3b', 'The library is a ______ place to read after school.', ['quiet', 'salty', 'bitter', 'sudden'], 0, '適合讀書的地方是 quiet。', 86),
            mc('er3c', 'Please bring a ______ of water on the school trip.', ['bottle', 'crowd', 'price', 'station'], 0, '一瓶水用 a bottle of water。', 88)
          ], topic, 'ER3_G' + genRound, '第一部分：詞彙'),
          emitMcq('初級-R4', [
            mc('er4a', 'The bus stop is ______ the school, so students can walk there.', ['near', 'sour', 'asleep', 'empty'], 0, '可以走路到達，用 near。', 87),
            mc('er4b', 'This soup is too ______. I will add some water.', ['salty', 'polite', 'crowded', 'careful'], 0, '湯太鹹，用 salty。', 81),
            mc('er4c', 'The clerk was ______ and helped us find the right train.', ['helpful', 'bitter', 'narrow', 'wooden'], 0, '店員幫忙找車，用 helpful。', 83)
          ], topic, 'ER4_G' + genRound, '第一部分：詞彙')
        ];

        const cloze = emitGroup('初級-cloze', [
          {
            k: 'ecloze-run',
            tags: ['run', 'all'],
            passage: 'Many students want to run farther without getting hurt. They spend ten minutes (5)______ before they leave home. (6)______ After the run, drinking water helps the body stay (7)______.',
            items: [
              { prompt: '請選出空格 (5) 最合適的字：', opts: ['stretching', 'stretch', 'stretched', 'to stretch'], ok: 0, why: 'spend time 後面接動名詞 stretching。', rate: 78 },
              { prompt: '請選出空格 (6) 最合適的句子：', opts: ['A slow jog three times a week can make the heart stronger.', 'The museum is closed all year.', 'Please buy two train tickets.', 'My uncle drives a bus.'], ok: 0, why: '空格要接「慢跑能讓心臟更強」這句，其餘與這段無關。', rate: 80 },
              { prompt: '請選出空格 (7) 最合適的字：', opts: ['healthy', 'health', 'healthily', 'heal'], ok: 0, why: 'stay 後面接形容詞 healthy。', rate: 77 }
            ]
          },
          {
            k: 'ecloze-coffee',
            tags: ['coffee'],
            passage: 'Brewing coffee at home is simple. First, grind the beans just before (5)______. (6)______ In a few minutes you can enjoy a cup that (7)______ the kitchen smell wonderful.',
            items: [
              { prompt: '請選出空格 (5) 最合適的字：', opts: ['brewing', 'brew', 'brewed', 'brews'], ok: 0, why: '介系詞 before 後面接動名詞 brewing。', rate: 76 },
              { prompt: '請選出空格 (6) 最合適的句子：', opts: ['Next, pour hot water slowly so the grounds get evenly wet.', 'The runners must arrive before six ten.', 'Please close the library on Monday.', 'My sister is buying a train ticket.'], ok: 0, why: '空格要接「接著慢慢注水」這句。', rate: 74 },
              { prompt: '請選出空格 (7) 最合適的字：', opts: ['makes', 'make', 'making', 'to make'], ok: 0, why: '先行詞 a cup 是單數，動詞用 makes。', rate: 79 }
            ]
          },
          {
            k: 'ecloze-city',
            tags: ['city', 'all'],
            passage: 'Our town opened a new reading corner at the metro station. People can sit there (5)______ they wait for the train. (6)______ It is a quiet place, so please keep your voice (7)______.',
            items: [
              { prompt: '請選出空格 (5) 最合適的字：', opts: ['while', 'during', 'because of', 'instead'], ok: 0, why: 'while 後面可以接子句 they wait。during 後面要接名詞。', rate: 75 },
              { prompt: '請選出空格 (6) 最合適的句子：', opts: ['The corner offers magazines and children\'s books.', 'The pool is closed for a swimming race.', 'Buy two loaves of bread before eight.', 'The bus leaves from platform three.'], ok: 0, why: '空格要說明閱讀角提供雜誌與童書。', rate: 81 },
              { prompt: '請選出空格 (7) 最合適的字：', opts: ['low', 'lowly', 'lowness', 'lowered'], ok: 0, why: 'keep + 受詞 + 形容詞，voice low。', rate: 73 }
            ]
          }
        ], topic, 'ER', '第二部分：段落填空', 5, genRound);

        const passages = emitGroup('初級-read', [
          {
            k: 'eread-pool',
            tags: ['run', 'city'],
            passage: '【公告 A｜游泳池】\nThe outdoor pool will close for cleaning from May 2 to May 6. It will open again on May 7 at 6:00 a.m.\n\n【公告 B｜會員與跑道】\nMonthly members will get five extra days. The running track on the third floor stays open from 6:00 a.m. to 10:00 p.m.',
            items: [
              { prompt: 'Why will the pool close?', opts: ['For cleaning.', 'For a swimming race.', 'Because the building is moving.', 'Because there is no water.'], ok: 0, why: '公告 A 寫 close for cleaning。', rate: 88 },
              { prompt: 'Which place stays open?', opts: ['The running track on the third floor.', 'The outdoor pool.', 'The ticket office.', 'The parking lot.'], ok: 0, why: '公告 B 寫三樓跑道維持開放。', rate: 86 },
              { prompt: 'What should a monthly member expect from May 2 to May 6?', opts: ['The pool is closed for cleaning, and the membership gets five extra days.', 'The pool stays open and the track closes.', 'Members must pay again on May 2.', 'The park is moving to a new city.'], ok: 0, why: '要同時看公告 A 的閉館與公告 B 的展延。', rate: 84 }
            ]
          },
          {
            k: 'eread-cafe',
            tags: ['coffee', 'city'],
            passage: '【告示 A｜時間地點】\nOur cafe cart will be at the old train station this Saturday from 10:00 a.m. to 4:00 p.m.\n\n【告示 B｜價格】\nA small hot coffee is 80 dollars, and a piece of banana cake is 50 dollars. If you bring your own cup, you get 10 dollars off.',
            items: [
              { prompt: 'Where will the cafe cart be on Saturday?', opts: ['At the old train station.', 'At the city hospital.', 'Inside the school library.', 'On the third floor of a mall.'], ok: 0, why: '告示 A 的地點是舊火車站。', rate: 89 },
              { prompt: 'How much is a piece of banana cake?', opts: ['50 dollars.', '80 dollars.', '10 dollars.', '4 dollars.'], ok: 0, why: '告示 B：蛋糕是 50 元，咖啡才是 80 元。', rate: 85 },
              { prompt: 'What can a customer do at the old train station on Saturday?', opts: ['Bring their own cup and pay 10 dollars less.', 'Buy the cake for 80 dollars after 4 p.m.', 'Visit the cart on Sunday at the hospital.', 'Get free cake by showing a student card.'], ok: 0, why: '地點在告示 A，自備杯子折 10 元在告示 B。', rate: 83 }
            ]
          },
          {
            k: 'eread-class',
            tags: ['all'],
            passage: '【通知 A｜集合】\nThe grade 8 trip to the science museum is next Thursday. Students must arrive at school by 7:40 a.m. The bus leaves at 8:00 a.m.\n\n【通知 B｜攜帶物品】\nPlease bring a lunch box, a bottle of water, and your student card. Phones must stay in your bag during the tour.',
            items: [
              { prompt: 'When does the bus leave?', opts: ['At 8:00 a.m.', 'At 7:40 a.m.', 'On Friday evening.', 'At noon.'], ok: 0, why: '通知 A：7:40 是到校時間，巴士 8:00 離開。', rate: 87 },
              { prompt: 'What should students bring?', opts: ['A lunch box, water, and a student card.', 'A sleeping bag.', 'A basketball.', 'A camera only.'], ok: 0, why: '通知 B 列出便當、水和學生證。', rate: 84 },
              { prompt: 'What is true about the Thursday trip?', opts: ['Students catch the 8:00 bus and keep phones in their bags.', 'The bus leaves at 7:40 and phones may be used all day.', 'Students stay at school and leave their lunch at home.', 'The museum trip is on Friday evening.'], ok: 0, why: '發車時間在通知 A，手機規定在通知 B。', rate: 82 }
            ]
          }
        ], topic, 'ER', '第三部分：閱讀理解', 8, genRound);

        const speaking = emitSpeaking('初級-speak', [
          {
            k: 'esp-a',
            items: [
              { part: '第一部分：純音聽複誦', audioOnly: true, timeLimitSec: 10, audioText: 'Could you tell me where the nearest bakery is?', expectedKeywords: ['could', 'tell', 'where', 'nearest', 'bakery'], instruction: '請聽兩次後，在 10 秒內複誦這句英文。' },
              { part: '第一部分：純音聽複誦', audioOnly: true, timeLimitSec: 10, audioText: 'Remember to bring water before you go jogging.', expectedKeywords: ['remember', 'bring', 'water', 'before', 'jogging'], instruction: '請聽兩次後，在 10 秒內複誦這句英文。' },
              { part: '第二部分：朗讀短文', audioOnly: false, timeLimitSec: 20, audioText: 'On Sunday morning, my family walks to the park. We buy fresh bread and sit under a tree for breakfast.', expectedKeywords: ['sunday', 'family', 'park', 'bread', 'breakfast'], instruction: '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。' },
              { part: '第三部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'What do you usually eat for breakfast?', expectedKeywords: ['breakfast', 'eat', 'bread', 'egg', 'milk', 'rice'], instruction: '請聽問題兩次，再用英文回答。' },
              { part: '第三部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'How do you go to school or work?', expectedKeywords: ['bus', 'metro', 'walk', 'bike', 'car', 'train'], instruction: '請聽問題兩次，再用英文回答。' }
            ]
          },
          {
            k: 'esp-b',
            items: [
              { part: '第一部分：純音聽複誦', audioOnly: true, timeLimitSec: 10, audioText: 'The reading room on the second floor is very quiet.', expectedKeywords: ['reading', 'room', 'second', 'floor', 'quiet'], instruction: '請聽兩次後，在 10 秒內複誦這句英文。' },
              { part: '第一部分：純音聽複誦', audioOnly: true, timeLimitSec: 10, audioText: 'Please check the train time before you leave home.', expectedKeywords: ['please', 'check', 'train', 'time', 'before', 'leave'], instruction: '請聽兩次後，在 10 秒內複誦這句英文。' },
              { part: '第二部分：朗讀短文', audioOnly: false, timeLimitSec: 20, audioText: 'After school, Amy and her brother practice English for twenty minutes. Then they help their mother set the table.', expectedKeywords: ['school', 'practice', 'english', 'twenty', 'table'], instruction: '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。' },
              { part: '第三部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'What sport do you like, and why?', expectedKeywords: ['like', 'because', 'run', 'ball', 'swim', 'fun'], instruction: '請聽問題兩次，再用英文回答。' },
              { part: '第三部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'Where do you like to go on weekends?', expectedKeywords: ['weekend', 'park', 'home', 'mall', 'beach', 'library'], instruction: '請聽問題兩次，再用英文回答。' }
            ]
          },
          {
            k: 'esp-c',
            items: [
              { part: '第一部分：純音聽複誦', audioOnly: true, timeLimitSec: 10, audioText: 'Do not forget to turn off the lights when you leave.', expectedKeywords: ['forget', 'turn', 'off', 'lights', 'leave'], instruction: '請聽兩次後，在 10 秒內複誦這句英文。' },
              { part: '第一部分：純音聽複誦', audioOnly: true, timeLimitSec: 10, audioText: 'The night market is crowded, but the food is delicious.', expectedKeywords: ['night', 'market', 'crowded', 'food', 'delicious'], instruction: '請聽兩次後，在 10 秒內複誦這句英文。' },
              { part: '第二部分：朗讀短文', audioOnly: false, timeLimitSec: 20, audioText: 'Last Saturday I helped at a school book sale. We sold old storybooks and used the money to buy new ones.', expectedKeywords: ['saturday', 'book', 'sale', 'sold', 'money'], instruction: '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。' },
              { part: '第三部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'Who do you usually talk to when you have a problem?', expectedKeywords: ['friend', 'mother', 'father', 'teacher', 'talk', 'help'], instruction: '請聽問題兩次，再用英文回答。' },
              { part: '第三部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'What time do you usually go to bed?', expectedKeywords: ['bed', 'night', 'ten', 'eleven', 'usually', 'sleep'], instruction: '請聽問題兩次，再用英文回答。' }
            ]
          }
        ], topic, 'ES', genRound);

        const writing = emitWriting('初級-write', [
          {
            k: 'ew-a',
            sentences: [
              { type: '句子改寫', prompt: 'The tea was too hot, so I waited. 請用 so...that... 改寫。', sample: 'The tea was so hot that I waited.', keywords: ['tea', 'so', 'hot', 'that', 'waited'] },
              { type: '句子合併', prompt: 'The girl is my classmate. / The girl is wearing a red hat. 請用 who 合併。', sample: 'The girl who is wearing a red hat is my classmate.', keywords: ['girl', 'who', 'wearing', 'red', 'hat', 'classmate'] },
              { type: '句子重組', prompt: '請重組：takes / me / twenty minutes / It / to / walk / to school / .', sample: 'It takes me twenty minutes to walk to school.', keywords: ['it', 'takes', 'me', 'twenty', 'minutes', 'walk'] }
            ],
            essay: { title: '第二部分：看圖段落寫作', svgType: 'morning', prompt: '請看圖。用約 50 個英文字描述圖中人物的早晨：有人在散步或慢跑，桌上還有一杯飲料。並寫出這幅情景給你的感受。', sample: 'This morning a person is jogging near the park while the sun is up. A cup of coffee sits on the table. I feel calm and ready for the day.', minWords: 35 }
          },
          {
            k: 'ew-b',
            sentences: [
              { type: '句子改寫', prompt: 'She was sick, so she stayed home. 請用 Because... 改寫。', sample: 'Because she was sick, she stayed home.', keywords: ['because', 'sick', 'stayed', 'home'] },
              { type: '句子合併', prompt: 'The dog is very friendly. / The dog lives next door. 請用 which 合併。', sample: 'The dog which lives next door is very friendly.', keywords: ['dog', 'which', 'lives', 'next', 'door', 'friendly'] },
              { type: '句子重組', prompt: '請重組：enough / is / old / ride / to / a bike / Ken / .', sample: 'Ken is old enough to ride a bike.', keywords: ['ken', 'old', 'enough', 'to', 'ride'] }
            ],
            essay: { title: '第二部分：看圖段落寫作', svgType: 'morning', prompt: '請看圖。用約 50 個英文字寫圖中的人在做什麼，以及你會不會想過同樣的早晨。', sample: 'In the picture, someone is running in the morning sun, and a warm drink is on the table. I would like a morning like this because it feels fresh and quiet.', minWords: 35 }
          },
          {
            k: 'ew-c',
            sentences: [
              { type: '句子改寫', prompt: 'He finished his homework. Then he watched a movie. 請用 After... 改寫成一句。', sample: 'After he finished his homework, he watched a movie.', keywords: ['after', 'finished', 'homework', 'watched', 'movie'] },
              { type: '句子合併', prompt: 'Ms. Lin is a nurse. / Ms. Lin works at the city hospital. 請用 who 合併。', sample: 'Ms. Lin, who works at the city hospital, is a nurse.', keywords: ['who', 'works', 'hospital', 'nurse'] },
              { type: '句子重組', prompt: '請重組：too / tired / was / I / run / to / .', sample: 'I was too tired to run.', keywords: ['too', 'tired', 'to', 'run'] }
            ],
            essay: { title: '第二部分：看圖段落寫作', svgType: 'morning', prompt: '請看圖。用約 50 個英文字描述圖裡的早晨活動，並說明這樣的開始為什麼讓人舒服。', sample: 'The picture shows a sunny morning, a short run, and a cup on the table. Starting the day this way feels comfortable and gives me energy.', minWords: 35 }
          }
        ], topic, 'EW', genRound);

        return { listening: listening, reading: readingSingles.concat(cloze, passages), speaking: speaking, writing: writing };
      }

      const listening = [
        emitMcq('中級-L1', [
          mc('il1a', pic, ['Line W-F reached ninety-six percent accuracy this quarter.', 'Every line was closed for a month.', 'The factory used no electricity yesterday.', 'Inventory fell to zero this morning.'], 0, '圖表重點是 W-F 產線準確率 96%。', 84, 'schedule', null, ['tech']),
          mc('il1b', pic, ['The night shift finished twelve urgent orders.', 'All workers left at noon.', 'The chart shows zero output for the year.', 'The office bought new desks only.'], 0, '圖表顯示夜班完成 12 張急單。', 80, 'schedule', null, ['tech']),
          mc('il1c', pic, ['Heart-rate zone two filled most of the weekly training.', 'The runner stopped training for a year.', 'The chart is a train timetable.', 'Every session was a sprint.'], 0, '訓練圖的大部分時間落在心率二區。', 82, 'runner', null, ['run'])
        ], topic, 'IL1_G' + genRound, '第一部分：看圖辨義'),
        emitMcq('中級-L2', [
          mc('il2a', '請聽語音：沖煮前，咖啡師正在確認什麼？', ['The barista is checking the water temperature before brewing.', 'The barista is painting the cafe wall.', 'The barista is packing boxes for shipping.', 'The barista is repairing the cash register.'], 0, '第二題是沖煮前確認水溫。', 83, 'coffee', null, ['coffee']),
          mc('il2b', '請聽語音：這張圖在比較什麼？', ['The chart compares three delivery routes by delay minutes.', 'The chart lists student exam scores.', 'The chart shows a weather forecast only.', 'The chart is a restaurant menu.'], 0, '第二題圖表在比較三條路線的延誤分鐘。', 78, 'schedule', null, ['tech', 'city']),
          mc('il2c', '請聽語音：上坡時，跑者如何前進？', ['The runner is keeping a steady pace on an uphill section.', 'The runner is swimming in a pool.', 'The runner is buying a train ticket.', 'The runner is cooking dinner.'], 0, '第二題是上坡穩定配速。', 81, 'runner', null, ['run']),
          mc('il2d', '請聽語音：這兩個人正在看什麼？', ['Two analysts are pointing at a shared production schedule.', 'Two analysts are playing basketball.', 'Two analysts are boarding a ferry.', 'Two analysts are washing cups.'], 0, '第二題是兩人一起看排程。', 79, 'schedule', null, ['tech'])
        ], topic, 'IL2_G' + genRound, '第一部分：看圖辨義'),
        emitMcq('中級-L3', [
          mc('il3a', ask, ['Yes. The global fund weight now matches our ten-year target.', 'The bank closes at three.', 'I paid with a credit card.', 'The meeting room is upstairs.'], 0, '問題在問投資組合是否已檢視，應回答配置結果。', 77, null, 'Have you reviewed the long-term mix of our savings plan?'),
          mc('il3b', ask, ['Let us run one more test and release it on Friday.', 'Yes, she sits on the fifth floor.', 'It was written three years ago.', 'I prefer the high-speed rail.'], 0, '在問今晚或週五上線，回答再測一次並週五發布。', 80, null, 'Should we release the new schedule tool tonight or wait until Friday?'),
          mc('il3c', ask, ['I kept most easy runs truly easy and saved speed for intervals.', 'The race fee was one thousand dollars.', 'The stadium opens at six.', 'No, I forgot my shoes.'], 0, 'How 詢問訓練方法，不是費用或場館時間。', 82, null, 'How did you improve your ten-kilometer time this season?')
        ], topic, 'IL3_G' + genRound, '第二部分：問答'),
        emitMcq('中級-L4', [
          mc('il4a', ask, ['Because a rush order forced a change in the rolling sequence.', 'Yes, the analyst finished university.', 'The shuttle bus comes at seven.', 'We ordered printer paper.'], 0, 'Why 要回答原因：急單改變了軋製順序。', 76, null, 'Why did the scheduling system raise an alert on Line W-H?'),
          mc('il4b', ask, ['Raising my step rate and keeping the same effort on hills.', 'Buying a ticket for the night train.', 'Watching a sports channel.', 'Borrowing a novel.'], 0, '問的是配速穩定的調整方法。', 81, null, 'What change helped you keep a steadier heart rate on long runs?'),
          mc('il4c', ask, ['Several managers could not fly in because of the typhoon.', 'The room holds twenty people.', 'Please send the file.', 'We already signed it.'], 0, 'Why 的答案是颱風造成主管無法到場。', 79, null, 'Why was the quarterly supply meeting postponed?')
        ], topic, 'IL4_G' + genRound, '第二部分：問答'),
        emitMcq('中級-L5', [
          mc('il5a', ask, ['Use a finer grind and a longer bloom.', 'Add three spoons of sugar.', 'Throw the grinder away.', 'Switch to cold tap water.'], 0, '咖啡偏酸時應磨細並延長悶蒸。', 75, null, 'This cup tastes sour and thin. What should I change first?'),
          mc('il5b', ask, ['Add one more mesh node near the window.', 'Buy a new phone tomorrow.', 'Move to another city.', 'Turn off every computer.'], 0, '陽台視訊卡頓，建議加一顆 mesh 節點。', 83, null, 'The video call freezes whenever I step onto the balcony. What should we do?'),
          mc('il5c', ask, ['Keep a three-year cash reserve before taking more market risk.', 'Put every dollar into one stock today.', 'Close the bank account.', 'Ignore the goal date.'], 0, '問題在問上調風險前要先準備什麼。', 78, null, 'Before we raise the risk of this portfolio, what should we set aside?')
        ], topic, 'IL5_G' + genRound, '第二部分：問答'),
        emitMcq('中級-L6', [
          mc('il6a', dlg, ['Save scores even if the browser tab closes.', 'Stop users from signing in.', 'Delete the spreadsheet every night.', 'Turn off the microphone.'], 0, 'pagehide 搭配 sendBeacon 是為了關頁仍能送出成績。', 86, null, 'Woman: How do we keep a test score if someone closes the tab? Man: Send it with navigator sendBeacon on pagehide. Question: What is the man trying to protect?'),
          mc('il6b', dlg, ['Spread the money across a global index fund.', 'Borrow to buy one technology stock.', 'Spend the savings on a car.', 'Close the account today.'], 0, '女士建議用全球指數基金分散，而不是押單一股票。', 82, null, 'Man: I may put all my savings into one technology stock. Woman: That is concentrated risk. A global index fund is steadier for ten years. Question: What does the woman advise?'),
          mc('il6c', dlg, ['Move the easy runs slower and keep the quality session hard.', 'Replace every run with swimming.', 'Skip sleep before race day.', 'Buy new shoes every week.'], 0, '教練要求課表兩極化：輕鬆日更慢、品質日維持強度。', 80, null, 'Woman: I run every day at the same medium effort. Man: Slow down on easy days and keep only one hard session. Question: What change does the man suggest?')
        ], topic, 'IL6_G' + genRound, '第三部分：簡短對話'),
        emitMcq('中級-L7', [
          mc('il7a', dlg, ['There must be no outage during peak hours.', 'The budget must be cut in half.', 'The work must finish in three days.', 'The team must change programming languages.'], 0, '客戶同意的條件是尖峰時段不能中斷。', 84, null, 'Woman: Did the client accept the database move? Man: Yes, provided that peak hours have zero downtime. Question: What condition did the client set?'),
          mc('il7b', dlg, ['Grind one step finer and bloom for forty seconds.', 'Add milk and sugar.', 'Use water from the cold tap.', 'Throw away the beans at once.'], 0, '萃取不足時，女士建議磨細並悶蒸 40 秒。', 77, null, 'Man: Today the washed coffee tastes sour. Woman: Grind one click finer and extend the bloom to forty seconds. Question: What should the man try?'),
          mc('il7c', dlg, ['Start the long run earlier, before the heat builds.', 'Cancel the training plan.', 'Run only at noon.', 'Skip water stations.'], 0, '高溫天把長跑改到更早，避免中午熱壓力。', 81, null, 'Woman: My noon long run felt much harder this week. Man: Move it to sunrise. The same pace will cost less in the heat. Question: What does the man recommend?')
        ], topic, 'IL7_G' + genRound, '第三部分：簡短對話'),
        emitMcq('中級-L8', [
          mc('il8a', dlg, ['Queue the jobs and resume them after the restart.', 'Delete the jobs permanently.', 'Ask an outside company to run them on Sunday.', 'Print every job on paper.'], 0, '答案在維護表：2:00–4:00 排隊，重開後繼續。對話沒有把表上的規則念完。', 83, null, 'Man: What happens to the two a.m. jobs during the Saturday patch? Woman: Use the maintenance table. That note is the rule. Question: According to the table, what happens to those jobs?', ['tech', 'all'], { chartHtml: paperTable('Saturday maintenance', [['2:00–4:00 a.m.', 'Jobs wait in a queue'], ['After restart', 'Jobs continue']]) }),
          mc('il8b', dlg, ['Write the decision down so the next shift can follow it.', 'Ignore the handover note.', 'Shut the line for a week.', 'Change the product price.'], 0, '交接表要求寫下改單原因，給下一班照做。', 79, null, 'Woman: The night shift may not know why we changed the order. Man: Look at the handover table before you leave. Question: What does the table require?', ['tech'], { chartHtml: paperTable('Handover table', [['Write down', 'The reason for the order change'], ['Reader', 'The next shift']]) }),
          mc('il8c', dlg, ['She will compare three fund fees before she moves any money.', 'She will withdraw everything tomorrow.', 'She will stop saving.', 'She will buy a house this weekend.'], 0, '步驟表的第一步是比較三檔費用，第二步才搬錢。', 80, null, 'Man: Are you moving your savings this week? Woman: Follow the steps on the card. Question: What will the woman do first?', ['all'], { chartHtml: paperTable('Savings steps', [['Step 1', 'Compare three fund fees'], ['Step 2', 'Move the money']]) })
        ], topic, 'IL8_G' + genRound, '第三部分：簡短對話'),
        emitMcq('中級-L9', [
          mc('il9a', talk, ['As cash for needs in the next three years.', 'As a bet on one new coin.', 'As money to buy factory machines.', 'As a thirty-year mortgage payment.'], 0, '三年資金桶是短期現金需求，不是投機。', 78, null, 'A careful savings plan keeps three buckets: cash for the next three years, a medium fund for ten years, and a broad stock fund for retirement.'),
          mc('il9b', talk, ['Most weekly distance should stay in easy zone two.', 'Every run should be a race.', 'Runners should avoid a heart-rate watch.', 'Sleep should be skipped before a test run.'], 0, '談話建議週跑量多數留在輕鬆二區。', 82, null, 'In this training block, keep about eighty percent of weekly distance in easy zone two. Use only one session for faster repeats.'),
          mc('il9c', talk, ['Light roasts need hotter water to show fruit flavors.', 'Hotter water removes all caffeine.', 'Hotter water is only for cleaning the kettle.', 'Dark roasts should always use boiling water for ten minutes.'], 0, '淺焙要用較熱水溫才帶得出果香。', 76, null, 'For light-roasted coffee, water around ninety-three degrees helps fruit flavors. Dark roasts taste rounder closer to eighty-eight degrees.')
        ], topic, 'IL9_G' + genRound, '第四部分：簡短談話'),
        emitMcq('中級-L10', [
          mc('il10a', talk, ['It cut setup changes by eighteen percent.', 'It removed every furnace.', 'It doubled delivery delays.', 'It ended quality checks.'], 0, '結果表寫換線次數減少 18%。談話要考生對照表格。', 81, null, 'The scheduling office posted this quarter result. Please answer from the results table. Question: What did the new model change?', ['tech'], { chartHtml: paperTable('Quarter results', [['Setup changes', 'Down 18%'], ['Furnaces', 'Still in use'], ['Quality checks', 'Unchanged']]) }),
          mc('il10b', talk, ['A unique session number is created when the test starts.', 'The number is created three days later.', 'The number is created only after a failing grade.', 'The number replaces the user name on the score sheet.'], 0, '流程表的第一步是開考當下建立編號。', 85, null, 'Listen and use the process table. Question: When is the session number created?', ['tech', 'all'], { chartHtml: paperTable('Score process', [['When the test starts', 'Create a session number'], ['While answering', 'Save in small steps'], ['If the page closes', 'Send one last copy']]) }),
          mc('il10c', talk, ['Bring the race packet on Friday and your own cup on Sunday.', 'Register on the morning of the race.', 'Pay an extra fee at the finish.', 'Skip the water stations.'], 0, '行程表：週五領物資，週日自備杯子。', 80, null, 'The race office asked runners to follow the weekend table. Question: What should a runner do?', ['run', 'city'], { chartHtml: paperTable('Race weekend', [['Friday', 'Pick up the race packet'], ['Sunday', 'Bring your own cup']]) })
        ], topic, 'IL10_G' + genRound, '第四部分：簡短談話')
      ];

      const readingSingles = [
        emitMcq('中級-R1', [
          mc('ir1a', 'By automating the routine sync, the team could ______ more time to the core design.', ['allocate', 'hesitate', 'evaporate', 'imitate'], 0, 'allocate time to 表示把時間分配給核心設計。', 84),
          mc('ir1b', 'The new timetable has ______ the morning bottleneck at the rolling mill.', ['eased', 'denied', 'pretended', 'offended'], 0, 'eased the bottleneck 表示舒緩瓶頸。', 80),
          mc('ir1c', 'A written handover note can ______ costly mistakes between shifts.', ['prevent', 'invite', 'borrow', 'taste'], 0, 'prevent mistakes 表示避免錯誤。', 82)
        ], topic, 'IR1_G' + genRound, '第一部分：詞彙'),
        emitMcq('中級-R2', [
          mc('ir2a', 'The team used a backup copy to ______ the lost schedule.', ['restore', 'pretend', 'wander', 'offend'], 0, 'restore 表示把遺失的排程救回來。', 78),
          mc('ir2b', 'Her note was ______, so the next shift understood the change at once.', ['concise', 'bitter', 'ancient', 'wooden'], 0, '短而清楚用 concise。', 80),
          mc('ir2c', 'The sensor reading was not ______, so they checked it again.', ['reliable', 'delicious', 'crowded', 'sour'], 0, '讀數不可靠用 not reliable。', 76),
          mc('ir2d', 'A five-line handover can ______ a repeated job.', ['avoid', 'bake', 'swim', 'borrow'], 0, 'avoid a repeated job 表示避免同一工作做兩次。', 77)
        ], topic, 'IR2_G' + genRound, '第一部分：詞彙'),
        emitMcq('中級-R3', [
          mc('ir3a', 'The morning bottleneck became less ______ after the new timetable.', ['severe', 'salty', 'asleep', 'wooden'], 0, '瓶頸減輕，用 less severe。', 81),
          mc('ir3b', 'Please keep a ______ record of each brew before you change the recipe.', ['brief', 'bitter', 'sudden', 'empty'], 0, '簡短紀錄用 brief record。', 79),
          mc('ir3c', 'The fee looks small, but the yearly cost is a ______ expense.', ['major', 'polite', 'narrow', 'asleep'], 0, '全年加總後是一筆主要支出，用 major。', 77)
        ], topic, 'IR3_G' + genRound, '第一部分：詞彙'),
        emitMcq('中級-R4', [
          mc('ir4a', 'The coach asked for a ______ easy day, not a hidden hard run.', ['genuine', 'sour', 'crowded', 'wooden'], 0, '真正輕鬆的一天用 genuine。', 80),
          mc('ir4b', 'Diversifying the savings plan reduces ______ risk.', ['concentrated', 'delicious', 'ancient', 'sleepy'], 0, '集中押注的風險用 concentrated risk。', 82),
          mc('ir4c', 'A reusable cup at the race is a ______ way to cut waste.', ['practical', 'bitter', 'sudden', 'asleep'], 0, '實際可行的做法用 practical。', 78)
        ], topic, 'IR4_G' + genRound, '第一部分：詞彙')
      ];

      const cloze = emitGroup('中級-cloze', [
        {
          k: 'icloze-coffee',
          tags: ['coffee'],
          passage: 'Coffee extraction follows a clear order. Fruit acids leave the grounds first, (5)______ by sweetness and then by bitter compounds. If the grind is too coarse, the cup tastes thin. (6)______ A short log of each brew lets you change one thing at a time and (7)______ the same flavor again.',
          items: [
            { prompt: '請選出空格 (5) 最合適的字：', opts: ['followed', 'following', 'follows', 'to follow'], ok: 0, why: '過去分詞 followed by 表示接著是甜感。', rate: 76 },
            { prompt: '請選出空格 (6) 最合適的句子：', opts: ['Therefore, write down each brew before you change the recipe.', 'The museum is free only on Sunday night.', 'Runners should skip every water station.', 'Please close the reading room on Monday.'], ok: 0, why: '空格要接「所以先把每次沖煮記下來」這句。', rate: 84 },
            { prompt: '請選出空格 (7) 最合適的字：', opts: ['repeat', 'repeating', 'repeated', 'to repeating'], ok: 0, why: '與 change 並列，共用 to，故用原形 repeat。', rate: 79 }
          ]
        },
        {
          k: 'icloze-run',
          tags: ['run'],
          passage: 'A useful training week is uneven on purpose. Most kilometers stay easy, (5)______ one session includes faster repeats. (6)______ Keeping notes of pace and sleep helps them (7)______ small problems early.',
          items: [
            { prompt: '請選出空格 (5) 最合適的字：', opts: ['while', 'during', 'because of', 'instead'], ok: 0, why: 'while 對比「大多數輕鬆，同時有一次更快」。', rate: 80 },
            { prompt: '請選出空格 (6) 最合適的句子：', opts: ['Runners who push every day often arrive tired before the race.', 'The cafe cart sells banana cake for fifty dollars.', 'Please create a session number three days later.', 'Dark coffee should always use boiling water for ten minutes.'], ok: 0, why: '空格要接「天天催快的人往往在賽前就累了」這句。', rate: 75 },
            { prompt: '請選出空格 (7) 最合適的字：', opts: ['notice', 'noticing', 'noticed', 'noticeable'], ok: 0, why: 'help them 後面接原形 notice。', rate: 78 }
          ]
        },
        {
          k: 'icloze-tech',
          tags: ['tech', 'all'],
          passage: 'When a test page only sends scores at the end, a closed tab can lose the work. A stronger design creates a session number at the start and saves progress (5)______ the way. (6)______ Teams that test this path (7)______ fewer missing rows.',
          items: [
            { prompt: '請選出空格 (5) 最合適的字：', opts: ['along', 'between', 'except', 'without'], ok: 0, why: 'along the way 表示過程中逐步儲存。', rate: 77 },
            { prompt: '請選出空格 (6) 最合適的句子：', opts: ['The final packet is small, so the browser can send it while the page is closing.', 'The outdoor pool will close for a city swimming race.', 'Buy two loaves of bread and get a free cup of coffee.', 'The night shift should ignore the handover note.'], ok: 0, why: '空格要接「最後一包很小，所以關頁時仍送得出去」這句。', rate: 82 },
            { prompt: '請選出空格 (7) 最合適的字：', opts: ['report', 'reports', 'reporting', 'reported'], ok: 0, why: '主詞 Teams 是複數，用 report。', rate: 74 }
          ]
        }
      ], topic, 'IR', '第二部分：段落填空', 5, genRound);

      const passages = emitGroup('中級-read', [
        {
          k: 'iread-sync',
          tags: ['tech', 'all'],
          passage: '【說明 A｜問題】\nWeb tests often lose scores when the result is sent only at the end.\n\n【說明 B｜作法】\nA session number is created as soon as the test starts. If the tab closes, the browser can still send one last packet during pagehide.',
          items: [
            { prompt: 'Why do some web tests lose scores?', opts: ['Because they send the result only at the end.', 'Because they create too many session numbers.', 'Because spreadsheets cannot store numbers.', 'Because users type too quickly.'], ok: 0, why: '說明 A：只在最後一次送出，中途關頁就會遺失。', rate: 88 },
            { prompt: 'When is the session number created?', opts: ['As soon as the test starts.', 'Three days after the test.', 'Only after a failing grade.', 'Before the instructions are written.'], ok: 0, why: '說明 B：開考當下就建立編號。', rate: 86 },
            { prompt: 'Why does the design create a session number at the start?', opts: ['So a closed tab can still send the last packet instead of losing an end-only result.', 'To make the screen larger.', 'To translate the audio offline.', 'To stop the window from closing.'], ok: 0, why: '說明 A 是只在最後送出會遺失，說明 B 用開考編號讓關頁仍送出最後一包。', rate: 83 }
          ]
        },
        {
          k: 'iread-run',
          tags: ['run'],
          passage: '【短文 A｜常見錯誤】\nRecreational runners often go too fast on easy days and too slow on quality days. A cadence near 175 to 185 steps per minute can lower the impact on the joints.\n\n【短文 B｜十六週結果】\nRunners who kept eighty percent of weekly distance in easy zone two improved their half-marathon time by about seven percent. Those who ran moderately hard every day improved by about two percent.',
          items: [
            { prompt: 'What mistake is described first?', opts: ['Easy days are too fast and quality days are too slow.', 'Runners replace all runs with swimming.', 'They drink no water.', 'They change shoes every day.'], ok: 0, why: '短文 A 首句就是輕鬆日太快、品質日太慢。', rate: 85 },
            { prompt: 'What is one benefit of a higher cadence?', opts: ['Less impact on the joints.', 'No need to warm up.', 'A doubled heart rate at once.', 'Permission to skip sleep.'], ok: 0, why: '短文 A：較高步頻可降低關節衝擊。', rate: 82 },
            { prompt: 'Which training choice fits both texts?', opts: ['Keep most distance easy, which also matches the group that improved by about seven percent.', 'Race every day to lower joint impact.', 'Train once a month at a very high cadence.', 'Avoid a watch and run moderately hard every day.'], ok: 0, why: '短文 A 指出輕鬆日不該太快，短文 B 的 7% 就是多數跑量留在輕鬆區的那組。', rate: 84 }
          ]
        },
        {
          k: 'iread-cafe',
          tags: ['coffee', 'city'],
          passage: '【告示 A｜平日早晨】\nThe harbor cafe will test a quieter morning service in June. From Tuesday to Friday, seats are held only until 8:30 a.m. for guests who booked the day before. Walk-in guests can order after 8:30, but laptop use is limited to forty minutes.\n\n【告示 B｜週末】\nOn weekends the cafe returns to its usual all-day seating. The forty-minute laptop limit is not used on Saturday or Sunday.',
          items: [
            { prompt: 'Who can keep a seat before 8:30 a.m. on a weekday?', opts: ['Guests who booked the day before.', 'Any walk-in guest.', 'Only weekend visitors.', 'People who stay for three hours.'], ok: 0, why: '告示 A：平日 8:30 前的座位保留給前一天訂位的客人。', rate: 86 },
            { prompt: 'What limit applies after 8:30 a.m. on a weekday?', opts: ['Laptop use is limited to forty minutes.', 'No coffee is sold.', 'The cafe closes.', 'Booking is required for water.'], ok: 0, why: '告示 A：8:30 後可現場點餐，但筆電限 40 分鐘。', rate: 81 },
            { prompt: 'How is a Saturday morning different from a Tuesday morning?', opts: ['Saturday uses all-day seating and does not apply the forty-minute laptop limit.', 'Saturday keeps seats only for guests who booked the day before.', 'Saturday closes the cafe at 8:30 a.m.', 'Saturday bans every guest who brings a laptop.'], ok: 0, why: '告示 A 是平日訂位與筆電限制，告示 B 是週末恢復全天座位且不用 40 分鐘限制。', rate: 83 }
          ]
        }
      ], topic, 'IR', '第三部分：閱讀理解', 8, genRound);

      const speaking = emitSpeaking('中級-speak', [
        {
          k: 'isp-a',
          items: [
            { part: '第一部分：朗讀短文', audioOnly: false, timeLimitSec: 25, audioText: 'Clear notes and steady practice matter more than a single busy day. A short training log can show what to change next week.', expectedKeywords: ['notes', 'practice', 'training', 'log', 'change'], instruction: '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'How do you make time for exercise on a busy weekday?', expectedKeywords: ['time', 'morning', 'schedule', 'exercise', 'work'], instruction: '請聽兩次後，用 15 秒回答。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'What makes an online practice tool useful for you?', expectedKeywords: ['clear', 'feedback', 'practice', 'easy', 'audio'], instruction: '請聽兩次後，用 15 秒回答。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 30, audioText: 'Explain why a long-term savings plan is safer than guessing the market every week.', expectedKeywords: ['long-term', 'plan', 'risk', 'steady', 'market'], instruction: '請聽兩次後，用 30 秒說明。' },
            { part: '第三部分：看圖敘述', audioOnly: false, timeLimitSec: 45, svgType: 'balance', printedQuestions: ['1. 圖中的三個部分分別是什麼？', '2. 你覺得這樣安排一週好嗎？為什麼？', '3. 你自己會怎麼調整？'], audioText: 'Describe how a person can balance project work, training, and family time in one week.', expectedKeywords: ['balance', 'work', 'training', 'family', 'week'], instruction: '【試卷印有圖與問題】請看圖後直接回答，不必把題號唸出來。' }
          ]
        },
        {
          k: 'isp-b',
          items: [
            { part: '第一部分：朗讀短文', audioOnly: false, timeLimitSec: 25, audioText: 'A good handover is short and specific. It tells the next shift what changed, why it changed, and what to watch.', expectedKeywords: ['handover', 'shift', 'changed', 'watch', 'specific'], instruction: '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'What do you check before you call a task finished?', expectedKeywords: ['check', 'test', 'finish', 'review', 'note'], instruction: '請聽兩次後，用 15 秒回答。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'How do you choose a place to study or train?', expectedKeywords: ['quiet', 'near', 'time', 'place', 'easy'], instruction: '請聽兩次後，用 15 秒回答。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 30, audioText: 'Describe a problem you solved by changing one small habit.', expectedKeywords: ['problem', 'habit', 'change', 'result', 'learned'], instruction: '請聽兩次後，用 30 秒描述。' },
            { part: '第三部分：看圖敘述', audioOnly: false, timeLimitSec: 45, svgType: 'balance', printedQuestions: ['1. 圖中三欄分別代表哪三件事？', '2. 哪一欄最容易被忽略？', '3. 你會怎麼把這三件事排進同一週？'], audioText: 'Describe how work, training, and home time can fit into one week, and say why the balance matters.', expectedKeywords: ['work', 'training', 'home', 'balance', 'week'], instruction: '【試卷印有圖與問題】請看圖後直接回答，不必把題號唸出來。' }
          ]
        },
        {
          k: 'isp-c',
          items: [
            { part: '第一部分：朗讀短文', audioOnly: false, timeLimitSec: 25, audioText: 'Hotter water is not always better. Light coffee needs more heat, while darker coffee can taste harsh if the water is too hot.', expectedKeywords: ['water', 'coffee', 'heat', 'light', 'dark'], instruction: '【試卷印有短文】請直接朗讀下方文字，正試不播放示範音。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'What helps you recover after a long day?', expectedKeywords: ['rest', 'walk', 'water', 'sleep', 'family'], instruction: '請聽兩次後，用 15 秒回答。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 15, audioText: 'Why do you keep records of your study or training?', expectedKeywords: ['record', 'progress', 'remember', 'plan', 'improve'], instruction: '請聽兩次後，用 15 秒回答。' },
            { part: '第二部分：回答問題', audioOnly: true, timeLimitSec: 30, audioText: 'Explain how a team should share bad news early instead of hiding it until the deadline.', expectedKeywords: ['early', 'team', 'problem', 'deadline', 'share'], instruction: '請聽兩次後，用 30 秒說明。' },
            { part: '第三部分：看圖敘述', audioOnly: false, timeLimitSec: 45, svgType: 'balance', printedQuestions: ['1. 圖中的人把時間分成哪三塊？', '2. 如果工作變多，運動和家庭會怎樣？', '3. 你同意這種分法嗎？'], audioText: 'Describe the three parts of the week in the picture and give your opinion.', expectedKeywords: ['work', 'run', 'home', 'week', 'balance'], instruction: '【試卷印有圖與問題】請看圖後直接回答，不必把題號唸出來。' }
          ]
        }
      ], topic, 'IS', genRound);

      const writing = emitWriting('中級-write', [
        {
          k: 'iw-a',
          translation: { title: '中譯英', prompt: '請翻譯：規律紀錄讓我們提早發現問題，也讓下一班的人知道為什麼要改。', sample: 'Regular records help us notice problems earlier and tell the next shift why a change was made.', keywords: ['records', 'problems', 'earlier', 'next', 'shift', 'why', 'change'] },
          essay: { title: '英文作文：提早說出問題', prompt: '用約 80 到 120 字說明，為什麼團隊應該在截止日前提早提出問題。請舉一個例子。', sample: 'Teams work better when problems are named early. Last month our night shift found that a rush order would miss its truck. Because the note was written at once, the day shift changed the sequence and still shipped on time. Waiting until the deadline would have hidden the choice. Early news is not complaining. It gives other people time to help.', minWords: 60 }
        },
        {
          k: 'iw-b',
          translation: { title: '中譯英', prompt: '請翻譯：大多數的跑量應該保持輕鬆，只有少數課表需要加快。', sample: 'Most of the running should stay easy, and only a few sessions need to be faster.', keywords: ['most', 'running', 'easy', 'only', 'few', 'faster'] },
          essay: { title: '英文作文：輕鬆日的價值', prompt: '用約 80 到 120 字說明，為什麼運動或學習時不能每天都用全力。', sample: 'Full effort every day feels productive, but it often slows progress. When I kept every run moderate, my legs stayed heavy and my paces stopped improving. After I made four days truly easy and kept one faster session, the hard day felt sharper. The same idea fits study. Short, rested practice beats a single exhausted night. Easy days are part of the work, not a break from it.', minWords: 60 }
        },
        {
          k: 'iw-c',
          translation: { title: '中譯英', prompt: '請翻譯：如果成績只在最後才送出，使用者一關掉視窗就可能失去全部作答。', sample: 'If scores are sent only at the end, users may lose all of their answers when they close the window.', keywords: ['scores', 'only', 'end', 'lose', 'close', 'window', 'answers'] },
          essay: { title: '英文作文：把重要的事寫下來', prompt: '用約 80 到 120 字說明，為什麼重要決定應該寫成紀錄，而不是只靠記憶。', sample: 'Important decisions should be written down because memory changes. In our project, one engineer remembered a rule differently from the night shift, and a job was processed twice. A five-line note would have shown the reason and the owner. Written records also help new people join without guessing. They are slower than a quick talk, but they remain after the meeting ends.', minWords: 60 }
        }
      ], topic, 'IW', genRound);

      return { listening: listening, reading: readingSingles.concat(cloze, passages), speaking: speaking, writing: writing };
    }

    function paperSignature(set) {
      if (!set) return '';
      const parts = [];
      (set.listening || []).forEach(q => {
        parts.push([q.stemKey || '', q.audioText || '', q.prompt || '', ...(q.options || [])].join('|'));
      });
      (set.reading || []).forEach(q => {
        parts.push([q.stemKey || '', q.passage || '', q.prompt || '', ...(q.options || [])].join('|'));
      });
      (set.speaking || []).forEach(q => parts.push((q.stemKey || '') + '|' + (q.audioText || '')));
      const writing = set.writing || {};
      (writing.sentences || []).forEach(s => parts.push((s.stemKey || '') + '|' + (s.prompt || '')));
      if (writing.essay) parts.push((writing.essay.stemKey || '') + '|' + (writing.essay.prompt || ''));
      if (writing.translation) parts.push((writing.translation.stemKey || '') + '|' + (writing.translation.prompt || ''));
      return parts.join('\n');
    }

    function prepareFreshExamPaper(level) {
      const topicEl = document.getElementById('ai-gen-topic');
      const topic = topicEl ? topicEl.value : '綜合日常與職場情境';
      const previous = paperSignature(QUESTION_BANK[level]);
      let set = null;
      let round = state.generationCount || 1;
      state.examUsePracticeBlock = true;
      try {
        for (let attempt = 0; attempt < 4; attempt++) {
          state.generationCount = (state.generationCount || 1) + 1;
          round = state.generationCount;
          set = buildParameterizedQuestionSet(level, topic, round);
          if (paperSignature(set) !== previous) break;
        }
      } finally {
        state.examUsePracticeBlock = false;
      }
      state.examPaper = { level: level, round: round, set: set };
      const badgeEl = document.getElementById('ai-gen-version-badge');
      if (badgeEl) badgeEl.textContent = '練習題庫：第 ' + (state.practiceRound[level] || 1) + ' 回｜正式測驗：第 ' + round + ' 回';
    }

    function scrubText(value) {
      return String(value == null ? '' : value).replace(/[<>]/g, '');
    }

    function practiceHasWork(level) {
      if (!state.practice || state.practice.level !== level) return false;
      const p = state.practice;
      const w = p.writingRes || {};
      return Object.keys(p.listeningAns || {}).length > 0
        || Object.keys(p.readingAns || {}).length > 0
        || Object.keys(p.speakingRes || {}).length > 0
        || !!(w.s1 || w.s2 || w.s3 || w.trans || w.essay);
    }

    function usableRemoteSet(level, set) {
      if (!set || !Array.isArray(set.listening) || set.listening.length !== 10) return false;
      if (!Array.isArray(set.reading) || set.reading.length !== 10) return false;
      if (!Array.isArray(set.speaking) || set.speaking.length !== 5) return false;
      const listenCount = level === '初級' ? 3 : 4;
      const choiceOk = (q, count) => q && Array.isArray(q.options) && q.options.length === count
        && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < count
        && String(q.audioText || q.prompt || '').trim();
      if (!set.listening.every(q => choiceOk(q, listenCount) && String(q.audioText || '').trim())) return false;
      if (!set.reading.every(q => choiceOk(q, 4))) return false;
      if (!set.speaking.every(q => q && String(q.audioText || '').trim() && Array.isArray(q.expectedKeywords))) return false;
      const writing = set.writing || {};
      if (level === '初級') {
        return Array.isArray(writing.sentences) && writing.sentences.length === 3 && writing.essay && writing.essay.prompt;
      }
      return !!(writing.translation && writing.translation.prompt && writing.essay && writing.essay.prompt);
    }

    function applyGeminiPayload(level, payload, purpose) {
      if (!payload || payload.ok !== true || !usableRemoteSet(level, payload.set)) return false;
      const set = payload.set;
      const scrubQuestion = (q) => {
        ['prompt', 'audioText', 'passage', 'part', 'instruction'].forEach(key => {
          if (q[key]) q[key] = scrubText(q[key]);
        });
        if (Array.isArray(q.options)) q.options = q.options.map(scrubText);
        if (Array.isArray(q.printedQuestions)) q.printedQuestions = q.printedQuestions.map(scrubText);
      };
      set.listening.forEach(scrubQuestion);
      set.reading.forEach(scrubQuestion);
      set.speaking.forEach(scrubQuestion);
      const writing = set.writing;
      (writing.sentences || []).forEach(row => {
        row.prompt = scrubText(row.prompt);
        row.sample = scrubText(row.sample);
      });
      if (writing.essay) {
        writing.essay.prompt = scrubText(writing.essay.prompt);
        writing.essay.sample = scrubText(writing.essay.sample);
      }
      if (writing.translation) {
        writing.translation.prompt = scrubText(writing.translation.prompt);
        writing.translation.sample = scrubText(writing.translation.sample);
      }
      if (payload.meta && typeof payload.meta === 'object') {
        Object.keys(payload.meta).forEach(id => {
          const meta = payload.meta[id] || {};
          state.dynamicMetaMap[id] = {
            peerRate: Math.max(60, Math.min(90, Number(meta.peerRate) || 78)),
            explanation: scrubText(meta.explanation || '請依題目關鍵字作答。')
          };
        });
      }
      if (purpose === 'exam') {
        state.examPaper = { level: level, round: Number(payload.round) || 1, set: set };
        return true;
      }
      if (state.activeTab === 'practice' && state.practice.level === level) return false;
      if (practiceHasWork(level)) return false;
      QUESTION_BANK[level] = set;
      state.practiceRound[level] = Number(payload.round) || state.practiceRound[level] || 1;
      return true;
    }

    async function fetchGeminiOnce(level, purpose) {
      const base = resolveGasWebhookUrl();
      if (!base) return null;
      const joiner = base.indexOf('?') >= 0 ? '&' : '?';
      const url = base + joiner + 'action=generateQuestions&level=' + encodeURIComponent(level)
        + '&purpose=' + encodeURIComponent(purpose) + '&t=' + Date.now();
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 50000);
      try {
        const resp = await fetch(url, { method: 'GET', cache: 'no-store', redirect: 'follow', signal: ctrl.signal });
        const text = await resp.text();
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start < 0 || end <= start) return null;
        return JSON.parse(text.slice(start, end + 1));
      } catch (err) {
        return null;
      } finally {
        clearTimeout(timer);
      }
    }

    async function fetchGeminiPaper(level, purpose) {
      let payload = await fetchGeminiOnce(level, purpose);
      if (payload && payload.busy) {
        await new Promise(resolve => setTimeout(resolve, 4000));
        payload = await fetchGeminiOnce(level, purpose);
      }
      if (!payload || payload.ok !== true) return null;
      return payload;
    }

    async function refreshPracticePapersFromGemini() {
      const levels = ['初級', '中級'];
      for (let i = 0; i < levels.length; i++) {
        try {
          const remote = await fetchGeminiPaper(levels[i], 'practice');
          applyGeminiPayload(levels[i], remote, 'practice');
        } catch (err) {}
      }
    }

    function seedDynamicBanks() {
      try {
        const topicEl = document.getElementById('ai-gen-topic');
        const topic = topicEl ? topicEl.value : '綜合日常與職場情境';
        const round = state.generationCount || 1;
        QUESTION_BANK['初級'] = buildParameterizedQuestionSet('初級', topic, round);
        QUESTION_BANK['中級'] = buildParameterizedQuestionSet('中級', topic, round);
        snapshotPracticeStems('初級');
        snapshotPracticeStems('中級');
        state.practiceRound['初級'] = round;
        state.practiceRound['中級'] = round;
        const badgeEl = document.getElementById('ai-gen-version-badge');
        if (badgeEl) badgeEl.textContent = '目前題庫版本：第 ' + round + ' 回（動態產生）';
      } catch (err) {
        showToast('題庫產生失敗', '請再按一次動態生成。', 'amber');
      }
    }
    function triggerGeminiDynamicGeneration() {
      const btnLobby = document.getElementById('btn-ai-generate-questions');
      const btnPrac = document.getElementById('btn-prac-ai-generate');
      const topicEl = document.getElementById('ai-gen-topic');
      const badgeEl = document.getElementById('ai-gen-version-badge');

      const topic = topicEl ? topicEl.value : '綜合日常與職場情境';
      const levelsToGen = ['初級', '中級'];

      if (btnLobby) {
        btnLobby.disabled = true;
        btnLobby.innerHTML = '<span>⏳ 正在動態命題中...</span>';
      }
      if (btnPrac) {
        btnPrac.disabled = true;
        btnPrac.textContent = '⏳ AI 出題中...';
      }

      state.generationCount++;
      const round = state.generationCount;

      levelsToGen.forEach(lv => {
        QUESTION_BANK[lv] = buildParameterizedQuestionSet(lv, topic, round);
        snapshotPracticeStems(lv);
        state.practiceRound[lv] = round;
      });

      state.practice.listeningAns = {};
      state.practice.readingAns = {};
      state.practice.speakingRes = {};
      state.practice.writingRes = { s1: '', s2: '', s3: '', trans: '', essay: '', feedbackMsg: '', score100: 0 };
      state.practice.lastEncourageMsg = `✨ 已為您動態生成【第 ${round} 回・${topic}】全新題組（含隨機選項洗牌與新詳解），開始練習吧！`;

      if (badgeEl) {
        badgeEl.textContent = `目前題庫版本：第 ${round} 回 (AI 動態合成＋選項洗牌)`;
      }
      if (btnLobby) {
        btnLobby.disabled = false;
        btnLobby.innerHTML = '<span>✨ 立即動態生成全新題庫</span>';
      }
      if (btnPrac) {
        btnPrac.disabled = false;
        btnPrac.textContent = '✨ AI 動態出新題';
      }

      if (state.activeTab === 'practice') {
        renderPracticeWorkspace();
      } else if (state.activeTab === 'exam' && state.exam.active) {
        prepareFreshExamPaper(state.exam.level);
        renderListeningSection();
        renderReadingSection();
        renderSpeakingSection();
        renderWritingSection();
      }

      showToast(
        `✨ 第 ${round} 回全新題庫已生成！`,
        `已依據「${topic}」為【${levelsToGen.join('、')}】產生全新不重複題目、隨機打亂選項位置並更新解析！`,
        'emerald'
      );
    }

    // =========================================================================
    // 8. INITIALIZATION & EVENT LISTENERS (含關閉視窗自動儲存攔截)
    // =========================================================================
    window.addEventListener('DOMContentLoaded', () => {
      loadSavedState();
      renderSheetRecordsTable();
      applyAndroidViewportLock();
      checkInstalledAppVersion();
      seedDynamicBanks();
      refreshPracticePapersFromGemini();
      verifyGoogleAccountOnStartup();

      const btnVersionContinue = document.getElementById('btn-app-version-continue');
      if (btnVersionContinue) btnVersionContinue.addEventListener('click', () => hideOutdatedVersionGate());

      const btnGoogleSignIn = document.getElementById('btn-google-signin');
      if (btnGoogleSignIn) btnGoogleSignIn.addEventListener('click', requestGoogleAccountLogin);

      const requireAuthOrNavigate = (targetTabCallback) => {
        if (!state.user || !state.user.loggedIn) {
          updateActiveView();
          if (isAndroidTabletApp()) requestGoogleAccountLogin();
          else mountGoogleSignIn(false);
          showToast('請先使用 Google 帳號登入', '未取得 Google 帳號時不能進入測驗或練習。', 'amber');
          return;
        }
        targetTabCallback();
      };

      // Navigation tabs (all guarded when not logged into Google)
      document.getElementById('nav-btn-lobby').addEventListener('click', () => {
        requireAuthOrNavigate(() => {
          requestLeaveExamScreen('測驗大廳', () => {
            state.activeTab = 'lobby';
            updateActiveView();
          });
        });
      });
      document.getElementById('nav-btn-practice').addEventListener('click', () => {
        requireAuthOrNavigate(() => {
          requestLeaveExamScreen('自主練習', () => {
            openPracticeMode();
          });
        });
      });
      document.getElementById('nav-btn-exam').addEventListener('click', () => {
        requireAuthOrNavigate(() => {
          if (!state.exam.sessionId) {
            startNewExam('初級');
          } else {
            state.activeTab = 'exam';
            updateActiveView();
            if (state.exam.active) armExamBackGuard();
          }
        });
      });
      document.getElementById('nav-btn-records').addEventListener('click', () => {
        requireAuthOrNavigate(() => {
          requestLeaveExamScreen('成績紀錄', () => {
            const openRecords = () => {
              state.activeTab = 'records';
              renderSheetRecordsTable();
              updateActiveView();
            };
            if (state.exam.sessionId && state.exam.active) {
              syncCurrentExamToSheet('進行中').then(openRecords, openRecords);
            } else {
              openRecords();
            }
          });
        });
      });

      const recordsBody = document.getElementById('sheet-records-tbody');
      if (recordsBody) {
        recordsBody.addEventListener('click', (event) => {
          const btn = event.target.closest('[data-review-session]');
          if (!btn) return;
          const sid = btn.getAttribute('data-review-session');
          state.openReviewId = state.openReviewId === sid ? '' : sid;
          renderSheetRecordsTable();
          if (state.openReviewId) renderRecordReview(true);
        });
      }
      const reviewClose = document.getElementById('record-review-close');
      if (reviewClose) {
        reviewClose.addEventListener('click', () => {
          state.openReviewId = '';
          renderSheetRecordsTable();
        });
      }

      // Practice & Start Exam Buttons
      document.getElementById('btn-practice-elementary').addEventListener('click', () => openPracticeMode('初級'));
      document.getElementById('btn-practice-intermediate').addEventListener('click', () => openPracticeMode('中級'));
      document.getElementById('btn-start-elementary').addEventListener('click', () => startNewExam('初級'));
      document.getElementById('btn-start-intermediate').addEventListener('click', () => startNewExam('中級'));

      // Practice Workspace Internal Controls
      document.getElementById('btn-prac-switch-elem').addEventListener('click', () => openPracticeMode('初級'));
      document.getElementById('btn-prac-switch-inter').addEventListener('click', () => openPracticeMode('中級'));
      document.getElementById('btn-reset-practice').addEventListener('click', () => {
        if (activeMicCapture && activeMicCapture.owner === 'practice') {
          const session = activeMicCapture;
          activeMicCapture = null;
          session.stop();
        }
        Object.keys(state.practice.speakingRes).forEach((key) => {
          const sr = state.practice.speakingRes[key];
          if (sr && sr.audioUrl) URL.revokeObjectURL(sr.audioUrl);
        });
        state.practice.listeningAns = {};
        state.practice.readingAns = {};
        state.practice.speakingRes = {};
        state.practice.writingRes = { s1: '', s2: '', s3: '', trans: '', essay: '', feedbackMsg: '', score100: 0 };
        state.practice.streak = 0;
        state.practice.lastEncourageMsg = '🔄 已重置本級別練習紀錄，放輕鬆重新開始練習吧！';
        renderPracticeWorkspace();
        showToast('已重置練習狀態', '所有練習作答已清空，不會影響正式測驗試算表紀錄。', 'emerald');
      });
      document.getElementById('btn-practice-to-exam').addEventListener('click', () => {
        startNewExam(state.practice.level, { freshPaper: true });
      });
      document.getElementById('prac-tab-listening').addEventListener('click', () => {
        state.practice.stage = 'listening';
        renderPracticeWorkspace();
      });
      document.getElementById('prac-tab-reading').addEventListener('click', () => {
        state.practice.stage = 'reading';
        renderPracticeWorkspace();
      });
      document.getElementById('prac-tab-speaking').addEventListener('click', () => {
        state.practice.stage = 'speaking';
        renderPracticeWorkspace();
      });
      document.getElementById('prac-tab-writing').addEventListener('click', () => {
        state.practice.stage = 'writing';
        renderPracticeWorkspace();
      });

      // Stage switcher tabs
      document.getElementById('stage-tab-listening').addEventListener('click', () => requestExamStage('listening'));
      document.getElementById('stage-tab-reading').addEventListener('click', () => requestExamStage('reading'));
      document.getElementById('stage-tab-speaking').addEventListener('click', () => requestExamStage('speaking'));
      document.getElementById('stage-tab-writing').addEventListener('click', () => requestExamStage('writing'));

      document.getElementById('btn-go-next-reading').addEventListener('click', () => requestExamStage('reading'));
      document.getElementById('btn-go-next-speaking').addEventListener('click', () => requestExamStage('speaking'));
      document.getElementById('btn-go-next-writing').addEventListener('click', () => requestExamStage('writing'));

      // AI Grade Writing button
      document.getElementById('btn-ai-grade-writing').addEventListener('click', () => {
        evaluateWritingScore(true);
        updateLiveScoreStrip();
        syncCurrentExamToSheet('進行中');
      });

      // Simulate unexpected window close (testing visibilitychange + navigator.sendBeacon)
      document.getElementById('btn-simulate-close').addEventListener('click', () => {
        if (!state.exam.sessionId) return;
        const runClose = () => {
          stopExamTimer();
          state.exam.active = false;
          document.getElementById('global-session-label').textContent = '已中途關閉';
          const sid = state.exam.sessionId;
          const checkpoint = state.exam.lastCheckpoint;
          syncCurrentExamToSheet('中途關閉', `考生自行關閉視窗，透過 pagehide/sendBeacon 自動寫入當下成績（停留於 ${checkpoint}）`, true)
            .then((ok) => {
              toastSheetResult(
                ok,
                '⚡ 已觸發「自行關閉視窗」自動寫入！',
                `測驗序號 ${sid} 已更新為「中途關閉」並保留目前得分寫入試算表。`,
                'amber',
                '中途成績尚未寫入試算表'
              );
            });
          state.activeTab = 'records';
          updateActiveView();
        };
        if (!state.exam.active) {
          runClose();
          return;
        }
        showExamLeaveGuard({
          title: '誤觸／離開目前程序',
          body: '偵測到可能誤觸「模擬關閉視窗」。確認後這一場會存成中途關閉。',
          leaveLabel: '確認離開並關閉',
          onLeave: runClose
        });
      });

      // Normal Submit Exam
      document.getElementById('btn-submit-exam').addEventListener('click', () => {
        if (!state.exam.sessionId) return;
        const runSubmit = () => {
          stopExamTimer();
          state.exam.active = false;
          state.exam.lastCheckpoint = '已完成全卷';
          document.getElementById('global-session-label').textContent = '已交卷';
          const finishedLevel = state.exam.level;
          syncCurrentExamToSheet('已完成', `考生正常交卷完試（${finishedLevel} 30分鐘雙階段測驗）`, false)
            .then((ok) => {
              toastSheetResult(
                ok,
                '🎉 測驗完成並已寫入「全民英檢成績」',
                '您的四科成績與合格判定已自動儲存至試算表！',
                'emerald',
                '測驗已交卷，但成績尚未寫入試算表'
              );
            });
          state.activeTab = 'records';
          updateActiveView();
        };
        if (!state.exam.active) {
          runSubmit();
          return;
        }
        showExamLeaveGuard({
          title: '誤觸／離開目前程序',
          body: '偵測到可能誤觸交卷。確認後會結束測驗並寫入成績。',
          leaveLabel: '確認交卷離開',
          onLeave: runSubmit
        });
      });

      // REAL BROWSER UNLOAD / VISIBILITYCHANGE / PAGEHIDE LISTENERS
      // 只要開始測驗，不管自行關閉或結束，自動將測驗結果儲存至試算表
      document.addEventListener('visibilitychange', () => {
        if (!state.exam.active) return;
        if (document.visibilityState === 'hidden') {
          state.exam.hiddenAt = Date.now();
          syncCurrentExamToSheet('進行中(背景自動備份)', `畫面切換或隱藏時自動備份於 ${state.exam.lastCheckpoint}`, true);
          return;
        }
        const hiddenAt = state.exam.hiddenAt || 0;
        state.exam.hiddenAt = 0;
        if (!hiddenAt || Date.now() - hiddenAt < 800) return;
        if (examLeaveIntent) return;
        showExamLeaveGuard({
          title: '誤觸／離開',
          body: '偵測到測驗畫面曾被切換或離開。計時沒有暫停，請回到目前程序繼續作答。',
          stayLabel: '繼續作答',
          where: examStayText()
        });
      });

      window.addEventListener('pagehide', () => {
        if (activeMicCapture) activeMicCapture.stop();
        if (state.exam.active) {
          syncCurrentExamToSheet('中途關閉', `考生關閉分頁/瀏覽器，由 pagehide + sendBeacon 自動寫入（最後停留：${state.exam.lastCheckpoint}）`, true);
        }
      });

      window.addEventListener('beforeunload', (event) => {
        if (!state.exam.active) return;
        event.preventDefault();
        event.returnValue = '';
      });

      window.addEventListener('popstate', () => {
        if (!state.exam || !state.exam.active) return;
        try { history.pushState({ geptExamGuard: 1 }, ''); } catch (e) {}
        if (examLeaveIntent) return;
        showExamLeaveGuard({
          title: '誤觸／離開目前程序',
          body: '偵測到返回鍵或上一頁，可能誤觸而離開目前程序。測驗仍在計時。',
          leaveLabel: '離開測驗畫面',
          onLeave: () => {
            if (state.activeTab === 'lobby') return;
            state.activeTab = 'lobby';
            updateActiveView();
          }
        });
      });

      const examLeaveGuard = document.getElementById('exam-leave-guard');
      if (examLeaveGuard) {
        examLeaveGuard.addEventListener('click', (event) => {
          if (event.target === examLeaveGuard) dismissExamLeaveGuard(false);
        });
      }
      const examLeaveStay = document.getElementById('exam-leave-guard-stay');
      const examLeaveGo = document.getElementById('exam-leave-guard-go');
      if (examLeaveStay) examLeaveStay.addEventListener('click', () => dismissExamLeaveGuard(false));
      if (examLeaveGo) examLeaveGo.addEventListener('click', () => dismissExamLeaveGuard(true));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && examLeaveIntent) {
          event.preventDefault();
          dismissExamLeaveGuard(false);
        }
      });

      const stickyObserver = new ResizeObserver(() => syncStickyLayout());
      const siteHeader = document.querySelector('header');
      if (siteHeader) stickyObserver.observe(siteHeader);
      ['exam-stage-tabs-sticky', 'practice-stage-tabs-sticky', 'sheet-records-scroll'].forEach((id) => {
        const node = document.getElementById(id);
        if (node) stickyObserver.observe(node);
      });
      window.addEventListener('resize', syncStickyLayout);
      window.addEventListener('orientationchange', () => {
        window.setTimeout(syncStickyLayout, 80);
      });
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', syncStickyLayout);
      }
      window.addEventListener('scroll', () => {
        const before = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        updateMainNavOnScroll();
        const after = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        if (before !== after) syncStickyLayout();
        else if (state.activeTab === 'records') fitSheetRecordsHeight();
      }, { passive: true });
      syncStickyLayout();
    });
  