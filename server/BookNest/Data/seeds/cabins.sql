CREATE TABLE IF NOT EXISTS Cabins
(
    id
    INT
    PRIMARY
    KEY
    AUTO_INCREMENT,
    Name
    VARCHAR
(
    255
),
    MaxCapacity INT,
    RegularPrice INT,
    Discount INT,
    Image VARCHAR
(
    255
),
    Description TEXT
    );

INSERT INTO Cabins (id, Name, MaxCapacity, RegularPrice, Discount, Image, Description)
SELECT *
FROM (SELECT 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                     AS id,
             '001'                                                                                                                                                                                                                                                                                                                                                                                                                                                                 AS name,
             2                                                                                                                                                                                                                                                                                                                                                                                                                                                                     AS max_capacity,
             250                                                                                                                                                                                                                                                                                                                                                                                                                                                                   AS regular_price,
             0                                                                                                                                                                                                                                                                                                                                                                                                                                                                     AS discount,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-001.jpg'                                                                                                                                                                                                                                                                                                                                                                          AS image,
             'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful night''s sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.' AS description
      UNION ALL
      SELECT 2,
             '002',
             2,
             350,
             25,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-002.jpg',
             'Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.'
      UNION ALL
      SELECT 3,
             '003',
             4,
             300,
             0,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-003.jpg',
             'Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.'
      UNION ALL
      SELECT 4,
             '004',
             4,
             500,
             50,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-004.jpg',
             'Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.'
      UNION ALL
      SELECT 5,
             '005',
             6,
             350,
             0,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-005.jpg',
             'Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.'
      UNION ALL
      SELECT 6,
             '006',
             6,
             800,
             100,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-006.jpg',
             'Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.'
      UNION ALL
      SELECT 7,
             '007',
             8,
             600,
             100,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-007.jpg',
             'Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.'
      UNION ALL
      SELECT 8,
             '008',
             10,
             1400,
             0,
             'https://keprwktzfiaytawfeabe.supabase.co/storage/v1/object/public/bucket/img/cabin-008.jpg',
             'Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef''s dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.') AS tmp
WHERE (SELECT COUNT(*) FROM Cabins) = 0;
