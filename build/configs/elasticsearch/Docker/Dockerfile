FROM docker.elastic.co/elasticsearch/elasticsearch:5.5.2

RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install http://dl.bintray.com/content/imotov/elasticsearch-plugins/org/elasticsearch/elasticsearch-analysis-morphology/5.5.2/elasticsearch-analysis-morphology-5.5.2.zip
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin remove x-pack
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin remove ingest-geoip
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin remove ingest-user-agent