require 'csv'
require 'html/proofer'
require 'json'

namespace :update do

  task :errors do
    `jekyll --no-auto`
    `cp _site/errors/404.html 404.html`
  end

  # Input: CSV file with columns: incode, cdc(true|false)
  task :locations, [:filename] do |task, args|
    CSV.open("_data/locations.csv", "wb") do |output|
      output << ['postcode','latitude','longitude','cdc']
      CSV.foreach(args[:filename]) do |row|
        incode = row[0]
        cdc = row[1]
        unless incode == ""
          sleep(2)
          puts incode
          uri = URI.parse("http://mapit.mysociety.org/postcode/partial/#{incode}")
          data = JSON.parse(Net::HTTP.get(uri))
          if data["wgs84_lat"] && data["wgs84_lon"]
            output << [incode, data["wgs84_lat"], data["wgs84_lon"], cdc]
          end
        end
      end
    end
  end

end

task :rebuild do
  sh "rm -rf _site"
  sh "bundle exec jekyll build"
end

task :htmlproofer => :rebuild do
  ignored = [
    "http://githubeditor.herokuapp.com"
  ]
  HTML::Proofer.new("./_site", 
    typhoeus: {ssl_verifypeer: false, timeout: 30, followlocation: true}, 
    url_ignore: ignored, 
    check_html: true, 
    assume_extension: ".html",
    href_ignore: [/facebook.com/]).run
end

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec => :rebuild)

task :default => [:htmlproofer]