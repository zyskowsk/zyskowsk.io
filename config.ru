use Rack::Static, 
  :urls => ["/images", "/js", "/css"],
  :root => "public"

map '/' do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/index.html', File::RDONLY)
    ]
  }
end

map '/snake' do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/snake.html', File::RDONLY)
    ]
  }
end

map '/asteroids' do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/asteroids.html', File::RDONLY)
    ]
  }
end

map '/minesweeper' do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/minesweeper.html', File::RDONLY)
    ]
  }
end

map '/resume' do
  run lambda { |env|
    [
      200, 
      { 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/resume.pdf')
    ]
  }
end




