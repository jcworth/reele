require 'nokogiri'
require 'open-uri'

class Project < ApplicationRecord
  belongs_to :user
  # has_many :project_categories
  # has_one :category, through: :project_categories
  has_many :comments, dependent: :destroy
  # CLOUDINARY RELATION -- REMOVED UNTIL STABLE
  # has_one_attached :photo
  has_one_attached :audio_file
  MEDIA_TYPE = ['audio', 'video']
  CATEGORY = ["Music",
                "Songwriting",
                "Session Musician",
                "Mixing",
                "Mastering",
                "Audio Engineer",
                "Producer",
                "Sound Design",
                "Composition",
                "Voice-Over",
                "ADR Recording",
                "Music Editor",
                "Foley Walker",
                "Podcast",
                "Music Supervision"]
  acts_as_taggable # Alias for acts_as_taggable_on :tags
  # acts_as_taggable_on :skills, :interests
  acts_as_taggable_on :tags

  validates :title, :media_type, presence: true


  ####################################################
  ############## AUDIO SCRAPE / EMBED METHODS ##############
  ####################################################

  def bandcamp_embed(part1, part2)

    iframe = "<iframe class=\"bandcamp_iframe\" style=\"border: 0; width: 100%; height: 120px;\"
              src=\"#{part1}size=medium#{part2}\" seamless></iframe>"
    iframe.html_safe
  end

  def bandcamp_scrape(project)
    html = open(project.audio_url).read
    doc = Nokogiri::HTML(html)
    image = doc.css('.popupImage img')
    project.photo = image[0].attributes['src'].value
    project.save!
    string = doc.css('meta[property="twitter:player"]').to_s
    embed = string.scan(/https.*list=true/)
    # split string into two portions for insertion into iframe
    embed_split = embed[0].split('size=large')
    bandcamp_embed(embed_split[0], embed_split[1])
  end

  def soundcloud_embed(embed)
    iframe = "<iframe class=\"soundcloud-iframe\" width=\"80%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\"
      src=\"https://w.soundcloud.com/player/?url=https\%3A//api.soundcloud.com/tracks/#{embed}&color=%23141414&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>"
    iframe.html_safe
  end

  def soundcloud_scrape(project)
    html = open(project.audio_url).read
    doc = Nokogiri::HTML(html)
    image = doc.css('meta[property="og:image"]')
    project.photo = image[0].attributes['content'].value
    project.save!
    string = doc.css('meta[property="twitter:player"]').to_s
    embed = string.scan(/s%2F*\d*/)
    soundcloud_embed(embed.reduce.split('s%2F')[1])
    # raise
  end

  def spotify_embed(project)
    html = open(project.audio_url).read
    doc = Nokogiri::HTML(html)
    image = doc.css('.cover-art-image')[0].attributes['style'].value.split("\)").first.split("\(\/\/").last
    project.photo = "https://#{image}"
    project.save!
    split_url = project.audio_url.split('track')
    iframe = "<iframe class=\"spotify-iframe\" src=\"#{split_url[0]}embed/track#{split_url[1]}\" width=\"75%\" height=\"80\" frameborder=\"0\"
              allowtransparency=\"true\" allow=\"encrypted-media\"></iframe>"
    iframe.html_safe
  end

  def apple_embed(project)
    split_url = project.audio_url.split('music')
    iframe = "<iframe allow=\"autoplay *; encrypted-media *;\" frameborder=\"0\" height=\"450\"
              style=\"width:100%;max-width:660px;overflow:hidden;background:transparent;\"
              sandbox=\"allow-forms allow-popups allow-same-origin allow-scripts
              allow-storage-access-by-user-activation allow-top-navigation-by-user-activation\"
              src=\"#{split_url[0]}embed.music#{split_url[1]}?app=music\">
              </iframe>"
    iframe.html_safe
  end
end
