import "../styles/latestNews.css";


const newsData = [
  {
    id: 1,
    category: "রাজনীতি",
    categoryClass: "badge-politics",
    cardBg: "card-bg-green",
    title: "জাতীয় পুনর্গঠনে BNP-র নতুন পদক্ষেপ ঘোষণা",
    date: "১২ মে, ২০২৬",
  },
  {
    id: 2,
    category: "সমাজ",
    categoryClass: "badge-society",
    cardBg: "card-bg-yellow",
    title: "বন্যা দুর্গতদের মাঝে ত্রাণ বিতরণ অব্যাহত",
    date: "১০ মে, ২০২৬",
  },
  {
    id: 3,
    category: "উন্নয়ন",
    categoryClass: "badge-development",
    cardBg: "card-bg-pink",
    title: "গ্রামীণ শিক্ষা উন্নয়নে নতুন কর্মসূচি চালু",
    date: "৮ মে, ২০২৬",
  },
  {
    id: 4,
    category: "সামাজিক",
    categoryClass: "badge-social",
    cardBg: "card-bg-blue",
    title: "তরুণ নেতৃত্ব উন্নয়নে কর্মশালা অনুষ্ঠিত",
    date: "৫ মে, ২০২৬",
  },
];

const LatestNews = () => {
  return (
    <section className="latest-news-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-bar"></span>
          সর্বশেষ সংবাদ
        </h2>
        <a href="#" className="see-all-link">
          সব দেখুন →
        </a>
      </div>

      <div className="news-grid">
        {newsData.map((news) => (
          <div className={`news-card ${news.cardBg}`} key={news.id}>
            <div className="card-image-area">
              <span className={`category-badge ${news.categoryClass}`}>
                {news.category}
              </span>
            </div>
            <div className="card-body">
              <h3 className="card-title">{news.title}</h3>
              <p className="card-date">{news.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
